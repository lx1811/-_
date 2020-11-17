import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
  path:'/login',
  name:'login',
  component:()=> import('@/views/login')
},{
  path:'/',
  redirect:'/home',
  component:()=> import('@/views/layout'),
  children:[{
    name:'home',
    path:'/home',
    component:()=>import('@/views/layout/components/home.vue')
  },{
    name:'QA',
    path:'/QA',
    component:()=>import('../views/layout/components/Q & A.vue')
  },{
    name:'video',
    path:'/video',
    component:()=>import('../views/layout/components/video.vue')
  },{
    name:'mine',
    path:'/mine',
    component:()=>import('../views/layout/components/mine.vue')
  }]
}]

const router = new VueRouter({
  routes
})

export default router
