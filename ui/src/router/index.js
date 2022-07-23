import { createRouter, createWebHistory } from 'vue-router'

import IndexView from '../views/IndexView.vue'
import ContactView from '../views/ContactView.vue'
import CookiePolicyView from '../views/CookiePolicyView.vue'
import TermsOfServiceView from '../views/TermsOfServiceView.vue'
import PrivacyPolicyView from '../views/PrivacyPolicyView.vue'

import userRoutes from './user.js'

import noAuth from '../middleware/noAuth.js'

const routes = [
  {
    path: '/',
    name: 'index',
    component: IndexView,
    beforeEnter: [noAuth],
  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactView,
  },
  {
    path: '/cookies',
    name: 'cookiePolicy',
    component: CookiePolicyView,
  },
  {
    path: '/terms',
    name: 'termsOfService',
    component: TermsOfServiceView,
  },
  {
    path: '/privacy',
    name: 'privacyPolicy',
    component: PrivacyPolicyView,
  },
  ...userRoutes,
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
