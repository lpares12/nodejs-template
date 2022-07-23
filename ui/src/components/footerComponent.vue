<template>
  <footer>
    <router-link to="/contact">Contact</router-link> |
    <router-link to="/terms">Terms</router-link> |
    <router-link to="/privacy">Privacy</router-link> |
    <div>My Page Inc.</div>
  </footer>
</template>

<style scoped>
footer{
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  flex-wrap: wrap;
}
</style>
