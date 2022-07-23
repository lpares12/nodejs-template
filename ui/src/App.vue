<template>
  <CookieBanner/>
  <NavbarComponent/>
  <router-view/>
  <FooterComponent/>
</template>

<script>
import NavbarComponent from '@/components/navbarComponent.vue'
import FooterComponent from '@/components/footerComponent.vue'
import CookieBanner from '@/components/cookieBanner.vue'

export default {
  name: 'App',
  components: {
    NavbarComponent,
    FooterComponent,
    CookieBanner
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
