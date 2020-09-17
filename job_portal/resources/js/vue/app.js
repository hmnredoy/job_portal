window.Vue = require('vue');
import router from "./router.js";
import "./components.js";
import "./libraries/filters"
import Vuex from 'vuex'
import store from './store';
import Gate from './Gate'
import { BootstrapVue, TablePlugin } from 'bootstrap-vue'
import Main from "./main.vue";

Vue.prototype.$user = window.user
Vue.prototype.$gate = new Gate(window.user)

Vue.use(BootstrapVue)
Vue.use(TablePlugin)
Vue.use(Vuex)

const app = new Vue({
    render: h => h(Main),
    store,
    router
}).$mount("#app");
