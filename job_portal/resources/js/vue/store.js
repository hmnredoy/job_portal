import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        loggedIn: false,
        userName: null,
    },
    mutations: {
        setLogin(state, yesNo){
            state.loggedIn = yesNo
        },
        setUserName(state, value){
            state.userName = value
        }
    }
})
