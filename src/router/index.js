import { createRouter, createWebHashHistory,createWebHistory } from 'vue-router'
import index from '../views/index.vue'

const routes = [
    {
        path: '/',
        name: 'scene',
        component: index
    },
]

const router = createRouter({
    history:createWebHashHistory(),
    routes
})
export default router
