import vue from 'vue';
import vuex from 'vuex';

Vue.use(Vuex)

export const vuex = new Vuex.Store({
    state : {
        price : 100
    },
    getters :{
        originPrice(state) {
            return state.price
        },
        doublePrice(state) {
            return state.price * 2
        },
        triplePrice(state) {
            return state.price * 3
        },
    }
});