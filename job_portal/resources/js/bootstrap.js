window._ = require('lodash');
window.$ = window.jQuery = require('jquery');
require('bootstrap');
window.axios = require('axios');
// window.axios = require('axios/dist/axios.js')

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
