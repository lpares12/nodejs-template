<template>
  <p>{{ message }}. Redirecting in 3 seconds, please click <router-link :to="{path: '/' + redirectTo}">here</router-link> if you are not redirected automatically</p>
</template>

<script>
export default{
  name: 'redirectPageComponent',
  props: {
    message: {
      type: String,
      required: true,
    },
    redirectTo: {
      type: String,
      default: "profile",
    }
  },
  mounted(){
    const router = this.$router;
    const redirect = this.redirectTo;
    setTimeout(function(){
      router.push({name: redirect});
    }, 3000);
  },
}
</script>
