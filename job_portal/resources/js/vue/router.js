import Vue from "vue";
import VueRouter from "vue-router";
import {helper} from "./helper";
Vue.use(VueRouter)

const routes = [
    {
        path: "/",
        name: "Index",
        component: () =>
            import(/* webpackChunkName: "js/Home" */ "./pages/Home.vue")
    },
    {
        path: "/dashboard",
        name: "Dashboard",
        meta: { requiresAuth: true },
        component: () =>
            import(/* webpackChunkName: "js/Dashboard" */ "./pages/Dashboard.vue")
    },
    {
        path: "/profile",
        name: "Profile",
        meta: { requiresAuth: true },
        component: () =>
            import(/* webpackChunkName: "js/Profile" */ "./pages/Profile.vue")
    },
    {
        path: "/login",
        name: "Login",
        component: () =>
            import(/* webpackChunkName: "js/Login" */ "./pages/Login.vue")
    },
    {
        path: "/register",
        name: "Register",
        component: () =>
            import(/* webpackChunkName: "js/Register" */ "./pages/Register.vue")
    },
    { path: '*', name: 'NotFound', component: require('./pages/NotFound.vue').default} //has to be at the end of route list
]

const router = new VueRouter({
    mode: "history",
    // base: process.env.BASE_URL,
    routes
});

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
    const currentUser = window.user

    let token = helper.getFromLocal("token")
    token ? helper.setToLocal("token", token) : ''

    if(!requiresAuth && typeof currentUser !== 'undefined'){
        next()
    }else if(requiresAuth && typeof currentUser === 'undefined'){

        if(router.currentRoute.fullPath !== '/login'){
            router.push({ path: '/login'})
        }
        next()
    } else {
        next()
    }

})

export default router;
