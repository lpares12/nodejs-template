<template>
  <RedirectPageComponent message="Purchase completed successfully" redirectTo="profile" />
</template>

<script>
import RedirectPageComponent from '@/components/redirectPageComponent.vue'

export default{
  name: 'CheckoutSuccessView',
  components: {
    RedirectPageComponent
  }
}
</script>
