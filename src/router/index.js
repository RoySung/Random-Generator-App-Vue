import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/pages/Main'
import RandomNumber from '@/components/pages/RandomNumber'
import RandomCustom from '@/components/pages/RandomCustom'

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
      component: RandomNumber
    }, {
      path: '/custom',
      name: 'Custom',
      component: RandomCustom
    }
  ]
})
