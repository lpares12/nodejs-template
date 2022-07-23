<template>
  <RedirectPageComponent message="Successful" redirectTo="profile" />
</template>

<script>
import RedirectPageComponent from '@/components/redirectPageComponent.vue'

export default{
  name: 'SubscriptionManageSuccessView',
  components: {
    RedirectPageComponent
  }
}
</script>
