import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Events from '@/components/Events'
import Login from '@/components/Login'
import SignUp from '@/components/SignUp'
import Profile from '@/components/Profile'
import Statistics from '@/components/Statistics'
import createMeetup from '@/components/createMeetup'
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
      path: '/statistics',
      name: 'Statistics',
      component: Statistics
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/createmeetup',
      name: 'createmeetup',
      component: createMeetup
    },
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      beforeEnter: AuthGuard
    }
  ]
})
