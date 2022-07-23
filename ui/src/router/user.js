import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ProfileView from '../views/ProfileView.vue'
import VerifyUserView from '../views/VerifyUserView.vue'
import PasswordChangeView from '../views/PasswordChangeView.vue'
import CheckoutCancelView from '../views/CheckoutCancelView.vue'
import CheckoutSuccessView from '../views/CheckoutSuccessView.vue'
import SubscriptionManageSuccessView from '../views/SubscriptionManageSuccessView.vue'

import auth from '../middleware/auth.js'
import noAuth from '../middleware/noAuth.js'

export default [
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    beforeEnter: [noAuth],
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
    beforeEnter: [noAuth],
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView,
    beforeEnter: [auth],
  },
  {
    path: '/user/verify/:uid/:tid',
    name: 'verify',
    component: VerifyUserView
  },
  {
    path: '/user/password/change/:uid/:tid',
    name: 'passwordChange',
    component: PasswordChangeView,
  },
  {
    path: '/subscription/checkout/cancel',
    name: 'checkoutCancel',
    component: CheckoutCancelView,
    beforeEnter: [auth],
  },
  {
    path: '/subscription/checkout/success/:sessionid',
    name: 'checkoutSuccess',
    component: CheckoutSuccessView,
    beforeEnter: [auth],
  },
  {
    path: '/subscription/manage/success',
    name: 'subscriptionManageSuccess',
    component: SubscriptionManageSuccessView,
    beforeEnter: [auth],
  }
]
