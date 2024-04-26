import { createStore } from 'vuex'
export default createStore({
    state: {
        num:0,
        tokenProgress:'',
    },
    mutations: {
        initToken(state,token){
            state.tokenProgress = token
        }
    },
    actions: {
    },
    modules: {
    }
})

