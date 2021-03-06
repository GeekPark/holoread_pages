import Vue from 'vue'
import Router from 'vue-router'
import DownLoad from './views/Downl'
import Preview from './views/Preview'
import HoloNews from './views/HoloNews'
import Todo from './views/Todo'
import Keywords from './views/Keywords'
import RSS from './views/RSS'
// import Source from '../views/Source'

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
      path: '/todo',
      name: 'Todo',
      component: Todo
    },
    {
      path: '/test',
      name: 'HoloNews',
      component: HoloNews
    },
    {
      path: '/keywords',
      name: 'Keywords',
      component: Keywords
    },
    {
      path: '/rss',
      name: 'RSS',
      component: RSS
    }
  ]
})
