import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/views/Hello'
import Preview from '@/views/Preview'
import Test from '@/views/Test'
import Source from '@/views/Source'

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
      path: '/source/:s',
      name: 'Source',
      component: Source
    },
    {
      path: '/test',
      name: 'Test',
      component: Test
    }
  ]
})
