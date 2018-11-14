// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify, { theme: {
  primary: '#009688',
  secondary: '#66BB6A',
  accent: '#FF9800',
  error: '#f44336',
  warning: '#ffeb3b',
  info: '#2196f3',
  success: '#4caf50'
}})

const moment = require('moment')
require('moment/locale/pt')
Vue.use(require('vue-moment'), {
    moment
})

Vue.use(VueAxios, axios)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  mounted: function(){

    this.axios.interceptors.request.use((config)  => {
      const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiQHRyc2QiLCJnaXRodWIiOiJodHRwczpcL1wvZ2l0bGFiLm1hbmF1cy5hbS5nb3YuYnJcL1NFTUVGXC9nZXNpc3BcL3Npc3RlbWFzXC90eGx4LWJhY2tlbmQuZ2l0In0.ZpVTOfszOoCwnsAvwa7jp9zKfmw81ntbRy9WybdxWF0'
      config.headers['X-Token'] = token
      config.headers['Content-Type'] = 'application/json; charset=utf-8'
      return config
    }, (err) => {
      console.log(err)
    })

    this.axios.interceptors.response.use((response) => {
      return response
    }, (error) => {
      console.log(error)
    })
  }
})
