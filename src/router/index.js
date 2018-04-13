import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Events from '@/components/Events'
import Login from '@/components/Login'
import SignUp from '@/components/SignUp'
import AuthGuard from './authGuard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/events/:id',
      name: 'Events',
      component: Events,
      beforeEnter: AuthGuard
    },
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      beforeEnter: AuthGuard
    }
  ]
})
