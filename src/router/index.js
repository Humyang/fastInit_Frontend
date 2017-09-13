import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import EditProject from '../components/EditProject.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/EditProject',
      name: 'EditProject',
      component: EditProject
    }
  ]
})
