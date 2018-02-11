// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import VueI18n from 'vue-i18n'
import bus from '@/lib/bus.js'
import 'vuetify/dist/vuetify.css'

import App from './App'
import router from './router'

import en from '@/i18n/en.json'
import tw from '@/i18n/tw.json'

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

bus.init()

Vue.use(Vuetify)
Vue.use(VueI18n)
Vue.config.productionTip = false

const messages = {
  en,
  tw
}

const locale = localStorage.lang

const i18n = new VueI18n({
  locale,
  messages
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  data () {
    return {
      bus
    }
  },
  router,
  i18n,
  template: '<App/>',
  components: { App }
})
