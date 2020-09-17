window.Vue = require('vue');
import router from "./router.js";
import "./components.js";
import "./libraries/filters"
import Vuex from 'vuex'
import store from './store';
import Gate from './Gate'
import { BootstrapVue, TablePlugin } from 'bootstrap-vue'

Vue.prototype.$user = window.user
Vue.prototype.$gate = new Gate(window.user)

Vue.use(BootstrapVue)
Vue.use(TablePlugin)
Vue.use(Vuex)

const app = new Vue({
    el: '#app',
    store,
    router
});
