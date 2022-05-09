import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from "@/views/HomeView";

Vue.use(VueRouter)

const routes = [{
    path: '/', name: 'home', component: newHome,
    children: [
        {path: '/1-1/1-1-1', name: 'registerDevice', component: () => import('../components/cloude/registerDevice')},
        {path: '/1-1/1-1-1/setDeviceModel',name:'setDeviceModel',component:()=>import('../components/cloude/setDeviceModel')}
    ]
},

]

const router = new VueRouter({
    mode: 'history', base: process.env.BASE_URL, routes
})

export default router
