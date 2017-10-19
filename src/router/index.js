import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import EditProject from '../components/EditProject.vue'
import EditModule from '../components/EditModule.vue'
import Login from '../components/Login.vue'
import ProjectList from '../components/ProjectList.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
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
