import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/pages/Main'
import NumberRandom from '@/components/pages/NumberRandom'
import CustomRandom from '@/components/pages/CustomRandom'

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
      name: 'Custom',
      component: CustomRandom
    }
  ]
})
