import Vue from "vue";

Vue.component('Navbar', require('./components/Navbar.vue').default)
Vue.component('Errors', require('./components/Errors.vue').default)
Vue.component('currency-input', require('./components/CurrencyInput.vue').default)
Vue.component('pagination', require('laravel-vue-pagination')).default;

