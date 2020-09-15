window.Vue = require('vue');
import router from "./router.js";
import "./components.js";
import Vuex from 'vuex'
import store from './store';

Vue.use(Vuex)

const app = new Vue({
    el: '#app',
    store,
    router
});
