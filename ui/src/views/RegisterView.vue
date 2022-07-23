<template>
  <div class="register">
    <img alt="Vue logo" src="../assets/logo.png">
    <p>Register</p>
    <div class="registerForm">
      <input type="text" name="user" id="user" placeholder="Username" v-model="user">
      <input type="email" name="email" id="email" placeholder="Email" v-model="email">
      <input type="password" name="pass" id="pass" placeholder="Password" v-model="password">
      <input type="password" name="pass2" id="pass2" placeholder="Password" v-model="password2">
      <input type="checkbox" name="terms" id="terms" required v-model="tos" true-value="yes" false-value="no"> Agreed to <a href="/tos" target="_blank">Terms of Service</a> and <a href="/privacy" target="_blank">Privacy Policy</a>
      <input type="button" value="Register" v-on:click="register()">
    </div>
  </div>
</template>

<script>
import { useUserStore } from '@/stores/user'

export default {
  name: 'RegisterView',
  data(){
    return {
      user: "",
      email: "",
      password: "",
      password2: "",
      tos: "no",
    };
  },
  methods: {
    async register() {
      if(this.password != this.password2){
        console.log("Passwords must match");
        return;
      }
      if(this.tos == "no"){
        console.log("You must accept the Terms of service");
        return;
      }

      const { register } = useUserStore()

      register(this.user, this.email, this.password)
      .then(() => {
        this.$router.push({name: "profile"});
      }).catch(error => {
        console.error(error.response.data);
      });
    }
  }
}
</script>
