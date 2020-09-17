import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        loggedIn: false,
        user: null,
    },
    mutations: {
        setLogin(state, yesNo){
            state.loggedIn = yesNo
        },
        setUser(state, value){
            state.user = value
        }
    }
})
