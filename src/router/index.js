import Vue from 'vue'
import Router from 'vue-router'
import DownLoad from '../views/Downkoad'
import Preview from '../views/Preview'
import Test from '../views/Test'
import Source from '../views/Source'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'DownLoad',
      component: DownLoad
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
