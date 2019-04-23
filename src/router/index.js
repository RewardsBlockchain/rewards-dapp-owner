import Vue from 'vue'
import Router from 'vue-router'

// Containers
import Full from '@/containers/Full'

// Views
import Deployment from '@/views/deployment'
import Distribution from '@/views/distribution'
import Management from '@/views/management'
import Guides from '@/views/guides'
import Resources from '@/views/resources'


Vue.use(Router)

export default new Router({
  mode: 'hash',
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      redirect: '/deployment',
      name: 'Home',
      component: Full,
      children: [
        {
          path: 'deployment',
          name: 'Deployment',
          component: Deployment
        },
        {
          path: 'distribution',
          name: 'Distribution',
          component: Distribution
        },
        {
          path: 'management',
          name: 'Management',
          component: Management
        },
        {
          path: 'guides',
          name: 'Guides',
          component: Guides
        },
        {
          path: 'source',
          name: 'Resources',
          component: Resources
        },

      ]
    },
  ]
})
