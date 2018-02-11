// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import bus from '@/lib/bus.js'
import 'vuetify/dist/vuetify.css'

import App from './App'
import router from './router'

import * as OfflinePluginRuntime from 'offline-plugin/runtime'

import VueI18n from 'vue-i18n'
import en from '@/i18n/en.json'
import tw from '@/i18n/tw.json'

import Raven from 'raven-js'
import RavenVue from 'raven-js/plugins/vue'

// OfflinePlugin
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

// Raven
if (process.env.NODE_ENV === 'production') {
  Raven
    .config('https://9e8415422ae94e758e11bf598ab2d0a6@sentry.io/286495')
    .addPlugin(RavenVue, Vue)
    .install()
}

bus.init()

Vue.use(Vuetify)
Vue.use(VueI18n)
Vue.config.productionTip = false

// VueI18n
const locale = localStorage.lang
const messages = {
  en,
  tw
}
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
