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
    path: '/pay',
    name: 'Pay',
    component: () =>
        import( /* webpackChunkName: "about" */ '../views/pay')
}, {
    path: "/",
    redirect: "/register"
}]

const router = new VueRouter({
    routes
})
router.beforeEach((to, from, next) => {
    // 验证token是否过期
    // let token = sessionStorage.getItem("_tk");

    // console.log(123, token);

    console.log('to', to);
    console.log('from', from);
    next()
})

export default router