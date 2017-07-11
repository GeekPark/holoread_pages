import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Preview from '@/components/Preview'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/preview/:id',
      name: 'Preview',
      component: Preview
    }
  ]
})
