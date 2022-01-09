import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)



const routes = [{
    path: '/home',
    name: 'Home',
    component: () =>
        import ( /* webpackChunkName: "about" */ '../views/Home')
}, {
    path: '/login',
    name: 'Login',
    component: () =>
        import ( /* webpackChunkName: "about" */ '../views/Login')
}, {
    path: "/",
    redirect: "/login"
}]

const router = new VueRouter({
    routes
})

export default router