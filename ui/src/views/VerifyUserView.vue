<template>
  <p>Email validation</p>
  <p v-if="error != ''">{{ error }}</p>
</template>

<script>
import axios from "axios";

export default{
  name: 'VerifyUserView',
  data(){
    return {
      error: "",
    }
  },
  mounted(){
    axios({method: "POST",
      "url": "http://localhost:5656/user/verify/" + this.$route.params.uid + "/" + this.$route.params.tid,
    }).then(res => {
      console.log(res);
      this.$router.push({name: "profile"});
    }).catch(err => {
      console.log(err);
      this.error = err.response.data;
    });
  },
}
</script>
