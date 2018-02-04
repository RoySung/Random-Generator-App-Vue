// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import bus from '@/lib/bus.js'
import 'vuetify/dist/vuetify.css'

import App from './App'
import router from './router'

import * as OfflinePluginRuntime from 'offline-plugin/runtime'

OfflinePluginRuntime.install({
  onUpdateReady: () => {
    OfflinePluginRuntime.applyUpdate()
    bus.isUpdate = true
    console.log('New Version, Ready To Update...')
  },
  onUpdated: () => {
    console.log('Update is Completed !')
    setTimeout(() => {
      bus.isUpdate = false
    }, 3000)
  }
})

Vue.use(Vuetify)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  data () {
    return {
      bus
    }
  },
  router,
  template: '<App/>',
  components: { App }
})
