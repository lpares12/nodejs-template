<template>
  <div class="profile">
    <h1>Hello {{ user.username }}</h1>
    <div v-if="user.isVerified">
      <p>If you wish to change your password click <span class="link" v-on:click="requestPasswordChange()">here</span></p>

      <div v-if="(new Date(user.subscriptionEndDate)) > today">
        <div v-if="user.plan == 'none'">
          <p>You are currently on a trial that ends on {{ formatDate(transformDate(user.subscriptionEndDate)) }}</p>
          <p>To purchase a new subscription click <span class="link" v-on:click="redirectToCheckout()">here</span></p>
        </div>
        <div v-else>
          <p v-if="user.membershipCancelled">You have cancelled your subscription. Your current plan will end on {{ formatDate(transformDate(user.subscriptionEndDate)) }}. You can activate your subscription again with the link below</p>
          <p v-else>You have an active subscription that ends on {{ formatDate(transformDate(user.subscriptionEndDate)) }}</p>
          <p>To manage your subscription click <span class="link" v-on:click="redirectToSubscriptionManagement()">here</span></p>
        </div>
      </div>
      <div v-else>
        <p>You don't have an active subscription</p>
        <p>To purchase a new subscription click <span class="link" v-on:click="redirectToCheckout()">here</span></p>
      </div>
    </div>
    <div v-else>
      <p>Please verify your account with the email we sent to {{ user.email }}. If you did not receive anything, click <span class="link" v-on:click="requestVerificationEmail()">here</span></p>
      <p>You are currently on a trial that ends on {{ formatDate(transformDate(user.subscriptionEndDate)) }}. You can only become a member after you have verified your email</p>
    </div>
  </div>
</template>

<script>
import { useUserStore } from '@/stores/user'
import axios from "axios";

export default {
  name: 'ProfileView',
  data(){
    return {
      user: {},
      today: "",
    };
  },
  mounted(){
    const userStore = useUserStore();
    if(userStore.user != null){
      this.user = userStore.user;
    }else{
      console.error("User not set. Please remove cookies and store");
      //TODO: Display an error in the site
    }
  },
  methods: {
    formatDate(dateIn){
      return dateIn.toString();
    },

    transformDate(dateStr){
      return new Date(dateStr);
    },

    requestVerificationEmail(){
      axios({method: "POST",
        "url": "http://localhost:5656/user/verify/generate",
        headers: {'auth': localStorage.getItem('token')},
      }).then(result => {
        console.log(result.data);
      }).catch(error => {
        console.log(error);
      });
    },

    requestPasswordChange(){
      axios({method: "POST",
        "url": "http://localhost:5656/user/password/generate",
        headers: {'auth': localStorage.getItem('token')},
      }).then(result => {
        console.log(result.data);
      }).catch(error => {
        console.log(error);
      });
    },

    redirectToCheckout(){
      axios({method: "GET",
        "url": "http://localhost:5656/subscription/checkout",
        headers: {'auth': localStorage.getItem('token')},
      }).then(result => {
        window.location.href = result.data;
      }).catch(error => {
        console.log(error);
      });
    },

    redirectToSubscriptionManagement(){
      axios({method: "GET",
        "url": "http://localhost:5656/subscription/manage",
        headers: {'auth': localStorage.getItem('token')},
      }).then(result => {
        window.location.href = result.data;
      }).catch(error => {
        console.log(error);
      });
    }
  }
}
</script>

<style scoped>
.link{
  cursor: pointer;
  color: blue;
  text-decoration: underline;
}
</style>
