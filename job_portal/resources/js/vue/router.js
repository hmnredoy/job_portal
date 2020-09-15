import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter)

const opeRouteNames = ['Login', 'Register', 'Index', 'NotFound']

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
        component: () =>
            import(/* webpackChunkName: "js/Dashboard" */ "./pages/Dashboard.vue")
    },
    {
        path: "/profile",
        name: "Profile",
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

    let open = to.matched.some((x) => {
        return opeRouteNames.includes(x.name)
    })


    if(localStorage.getItem("token") == 'undefined'){
        localStorage.removeItem("token")
    }

    let currentUser = localStorage.getItem("token")


    if(!open && !currentUser) {
        next('/')
    }
    else {
        next()
    }
})

export default router;
