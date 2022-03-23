import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)



const routes = [{
    path: '/home',
    name: 'Home',
    component: () =>
        import( /* webpackChunkName: "about" */ '../views/Home'),
    children: [
        // 搜索
        {
            path: 'search',
            name: 'search',
            component: () =>
                import('../views/Home/search')
        },

        // 主页
        {
            path: 'amain',
            name: 'amain',
            component: () =>
                import('../views/Home/Main')
        },

        // 商品清单
        {
            path: 'commoditylist',
            name: 'commodityList',
            component: () =>
                import('../views/Home/commodityList')
        },

        // 网站公告
        {
            path: 'websiteannouncement',
            name: 'websiteAnnouncement',
            component: () =>
                import('../views/Home/websiteAnnouncement')
        },

        // 关于我们
        {
            path: 'aboutus',
            name: 'aboutUs',
            component: () =>
                import('../views/Home/aboutus')
        },

        // 爱心公益
        {
            path: 'welfare',
            name: 'welfare',
            component: () =>
                import('../views/Home/welfare')
        },

        // 商品详情页
        {
            path: 'detail',
            name: 'detail',
            component: () =>
                import('../views/Home/detail')
        },
        // 购物车
        {
            path: 'gocar',
            name: 'gocar',
            component: () =>
                import('../views/Home/gocar')
        },
    ]
},
{
    path: '/login',
    name: 'login',
    component: () =>
        import('../views/login')
}, {
    path: '/register',
    name: 'Register',
    component: () =>
        import('../views/Register')
}, {
    path: '/pay',
    name: 'Pay',
    component: () =>
        import('../views/pay')
},
{
    path: '/forgetPassword',
    name: 'forgetPassword',
    component: () =>
        import('../views/forgetPassword')
},
{
    path: '/shopping',
    name: 'shopping',
    component: () =>
        import('../views/shopping')
},









// {
//     path: '/gantt',
//     name: 'Gantt',
//     component: () =>
//         import( /* webpackChunkName: "about" */ '../views/gantt')
// },

{
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