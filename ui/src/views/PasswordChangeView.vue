<template>
  <p>Password change</p>
  <p v-if="mountError != ''"> {{ mountError }}</p>
  <div v-if="mountError === ''">
    <p>Please {{ username }} change your password</p>
    <p v-if="error != ''">{{ error }}</p>
    <div id="passwordChangeForm">
      <input type="password" name="pass" id="pass" placeholder="Password" v-model="pass">
      <input type="password" name="pass2" id="pass2" placeholder="Password" v-model="pass2">
      <input type="button" value="Save" v-on:click="changePassword()">
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default{
  name: 'PasswordChangeView',
  data(){
    return {
      username: "",
      pass: "",
      pass2: "",
      error: "",
      mountError: "",
    }
  },
  mounted(){
    axios({method: "GET",
      "url": "http://localhost:5656/user/password/change/" + this.$route.params.uid + "/" + this.$route.params.tid,
    }).then(result => {
      this.username = result.data.username;
    }).catch(err => {
      console.log(err);
      this.mountError = err.response.data;
    });
  },
  methods: {
    async changePassword(){
      if(this.pass != this.pass2){
        this.error = "Passwords must match";
        return;
      }

      axios({method: "POST",
        "url": "http://localhost:5656/user/password/change/" + this.$route.params.uid + "/" + this.$route.params.tid,
        data: {pass: this.pass, pass2: this.pass2},
      }).then(() => {
        console.log("Modify password completed");
        this.$router.push({name: "login"});
      }).catch(err => {
        console.log(err);
        this.mountError = err.response.data;
      });
    }
  }
}
</script>
