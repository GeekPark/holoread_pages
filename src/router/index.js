import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Preview from '@/components/Preview'
import Test from '@/components/Test'

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
    },
    {
      path: '/test',
      name: 'Test',
      component: Test
    }
  ]
})
