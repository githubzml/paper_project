import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)



const routes = [{
    path: '/home',
    name: 'Home',
    component: () =>
        import( /* webpackChunkName: "about" */ '../views/Home')
}, {
    path: '/register',
    name: 'Register',
    component: () =>
        import( /* webpackChunkName: "about" */ '../views/Register')
}, {
    path: "/",
    redirect: "/register"
}]

const router = new VueRouter({
    routes
})

export default router