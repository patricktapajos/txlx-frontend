import Vue from 'vue'
import Router from 'vue-router'
import Identify from '@/components/Identify'
import Register from '@/components/Register'
import Print from '@/components/Print'
import Immobile from '@/components/Immobile'

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
      path: '/dadosimovel',
      name: 'Immobile',
      component: Immobile,
      props: true
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
