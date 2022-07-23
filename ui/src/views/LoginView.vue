<template>
  <div class="login">
    <img alt="Vue logo" src="../assets/logo.png">
    <p>Login</p>
    <p v-if="error != ''">{{ error }}</p>
    <div class="loginForm">
      <input type="text" name="user" id="user" placeholder="Username" v-model="user">
      <input type="password" name="pass" id="pass" placeholder="Password" v-model="password">
      <input type="button" value="Log In" v-on:click="login()">
    </div>
    <p>If you forgot your password click <span class="link" v-on:click="resetPasswordModal = true">here</span></p>
    <div v-if="resetPasswordModal">
      <p>Please enter your username or email to reset your password</p>
      <input type="text" name="reset" id="reset" placeholder="Username or email" v-model="reset">
      <input type="button" value="Log In" v-on:click="requestPasswordReset()">
    </div>
  </div>
</template>

<script>
import { useUserStore } from '@/stores/user'
import axios from "axios";

export default {
  name: 'LoginView',
  data(){
    return {
      user: "",
      password: "",
      error: "",
      resetPasswordModal: false,
      reset: "",
    };
  },
  methods: {
    async login() {
      const { login } = useUserStore()

      login(this.user, this.password)
      .then(() => {
        this.$router.push({name: "profile"});
      }).catch(error => {
        if(!error.response.data){
          this.error = error.message;
        }else{
          this.error = error.response.data;
        }
      });
    },
    async requestPasswordReset(){
      if(this.reset == ''){
        return;
      }

      axios({method: "POST",
        "url": "http://localhost:5656/user/password/reset",
        data: {username: this.reset},
      }).then(result => {
        console.log(result.data);
      }).catch(error => {
        console.log(error);
      });
    }
  },
}
</script>
