import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

let uData = window.localStorage.getItem('uData')

const store = new Vuex.Store({
    state: {
        loggedIn: false
    },
    mutations: {
        setLogin(state, yesNo){
            state.loggedIn = yesNo
        }
    }
})


export default store;
