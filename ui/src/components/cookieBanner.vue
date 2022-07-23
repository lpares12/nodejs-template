<template>
  <div id="cookiesBanner" v-if="display">
    <p>By continuing to visit this site, you accept the use of cookies as specified in our <router-link to="/cookies">cookie policy</router-link></p>
    <button id="rejectCookies" v-on:click="rejectCookies()">Reject</button>
    <button id="acceptCookies" v-on:click="acceptCookies()">Accept</button>
  </div>
</template>

<script>
export default{
  name: 'cookieBanner',
  data(){
    return {
      cookieName: "consentCookie",
      bots: /bot|crawler|spider|crawling/i,
      executableFunction: null, //TODO: Pass function as prop
      display: false,
    };
  },
  mounted(){
    var isBot = this.bots.test(navigator.userAgent);

    if(isBot || this.hasConsent() === false){
      this.display = false;
      return;
    }else if(this.hasConsent() === true){
      if(this.executableFunction){
        this.executableFunction();
      }

      return;
    }

    this.display = true;
  },
  methods: {
    hasConsent(){
      var cookieValue = this.getCookie(this.cookieName);
      if(cookieValue == 'true'){
        return true;
      }else if(cookieValue == 'false'){
        return false;
      }

      return null;
    },

    setConsent(consent){
      this.setCookie(this.cookieName, consent);
    },

    rejectCookies(){
      this.setConsent(false);
      this.display = false;
    },

    acceptCookies(){
      this.setConsent(true);
      this.display = false;
      if(this.executableFunction){
        this.executableFunction();
      }
    },

    setCookie(cookieName, value){
      //Set cookie for 1 year
      document.cookie = cookieName + '=' + value + ';max-age=' + 60*60*24*365 + '; path=/';
    },

    getCookie(cookieName){
      var cookies = document.cookie.split(';');
      for(var i = 0; i < cookies.length; i+= 1){
        if(cookies[i].split('=')[0].trim() == cookieName){
          return cookies[i].split('=')[1].trim();
        }
      }

      return null;
    }
  },
}
</script>

<style scoped>
cookiesBanner{
}
</style>

