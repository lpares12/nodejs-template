<template>
  <RedirectPageComponent message="Payment cancelled or unsuccessful" redirectTo="profile" />
</template>

<script>
import RedirectPageComponent from '@/components/redirectPageComponent.vue'

export default{
  name: 'CheckoutCancelView',
  components: {
    RedirectPageComponent
  }
}
</script>
