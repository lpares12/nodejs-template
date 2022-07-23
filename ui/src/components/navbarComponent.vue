<template>
  <div id="navbar">
    <nav v-if="!logged">
      <router-link to="/">Portal</router-link> |
      <router-link to="/login">Login</router-link> |
      <router-link to="/register">Register</router-link>
    </nav>
    <nav v-if="logged">
      <router-link to="/profile">Home</router-link> |
      <a v-on:click="logout()">Logout</a>
    </nav>
  </div>
</template>

<script>
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'

export default {
  name: 'NavbarComponent',
  data(){
    return {
      logged: false,
    };
  },
  mounted(){
    const userStore = useUserStore();
    const { isLogged } = storeToRefs(userStore);

    this.logged = isLogged;
  },
  methods: {
    logout(){
      const { logout } = useUserStore();
      logout().then(() => {
        this.$router.push({name: "index"});
      }).catch(error => {
        console.log(error.response.data);
        this.$router.push({name: "index"});
      });
    },
  },
}
</script>

<style>
nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>

