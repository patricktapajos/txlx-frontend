import Vue from 'vue'
import Router from 'vue-router'
import Identify from '@/components/Identify'
import Register from '@/components/Register'
import Print from '@/components/Print'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Identify
    },
    {
      path: '/identificar',
      name: 'Identify',
      component: Identify
    },
    {
      path: '/cadastro',
      name: 'Register',
      component: Register,
      props: true
    },
    {
      path: '/visualizar',
      name: 'Print',
      component: Print,
      props: true
    }
  ]
})
