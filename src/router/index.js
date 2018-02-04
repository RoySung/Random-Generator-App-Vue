import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/pages/Main'
import NumberRandom from '@/components/pages/NumberRandom'
import CustomizeList from '@/components/pages/CustomizeList'
import CustomRandom from '@/components/pages/CustomRandom'
import Settings from '@/components/pages/Settings'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    }, {
      path: '/number',
      name: 'Number',
      component: NumberRandom
    }, {
      path: '/custom',
      name: 'CustomizeList',
      component: CustomizeList
    }, {
      path: '/custom/:name',
      name: 'Custom',
      component: CustomRandom
    }, {
      path: '/settings',
      name: 'Settings',
      component: Settings
    }
  ]
})
