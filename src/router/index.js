import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import EditProject from '../components/EditProject.vue'
import EditModule from '../components/EditModule.vue'
import Login from '../components/Login.vue'
import ProjectList from '../components/ProjectList.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/ProjectList',
      name: 'ProjectList',
      component: ProjectList
    },
    {
      path: '/EditProject',
      name: 'EditProject',
      component: EditProject
    },
    {   
        path:'/EditProject/:projectId',
        name:'WriteArticle',
        component:EditProject
    },
    {
      path: '/EditModule',
      name: 'EditModule',
      component: EditModule
    }
  ]
})
