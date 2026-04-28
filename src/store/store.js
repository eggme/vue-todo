import Vue from 'vue'
import Vuex from 'vuex'
import todoApp from './modules/todoApp'

Vue.use(Vuex) // vue 의 플러그인이라는 기능
// Vue를 사용하는 모든 영역에 특정 기능을 추가하고 싶을 때...


export const store = new Vuex.Store({
    modules: {
        todoApp,
    },
})