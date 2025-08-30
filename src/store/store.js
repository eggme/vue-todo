import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex) // vue 의 플러그인이라는 기능
// Vue를 사용하는 모든 영역에 특정 기능을 추가하고 싶을 때...

// store란 컴포넌트들끼리 공통으로 사용하는 데이터들을 관리해주는 것

const storage = {
    fetch() {
        console.log('call fetch');
        
        const arr = [];
        const copiedLocalStorages = Object.fromEntries(
            Object.keys(localStorage).map(k => {
                return [k, {...JSON.parse(localStorage.getItem(k))}]
            })
        )
        for(const key in copiedLocalStorages) {
            const item = JSON.parse(localStorage.getItem(key))
            if( item && !arr.some(t => t.uuid === item.uuid) ) {
                arr.push(item)
            }
        } 
        return arr
    },
}

export const store = new Vuex.Store({
    state : {
        todoItems: storage.fetch() 
    },
    getters: {
        totalItems(state) {
            return [...state.todoItems].sort((a, b) => {
                if (!a.regdt) return 1
                if (!b.regdt) return -1     
                return new Date(b.regdt) - new Date(a.regdt)
            })
        }
    },
    actions: {
        delayedPushItem(context, item) {
            context.commit('pushItem', item)
        }
    },
    mutations : { 
        pushItem(state, item) {
            console.log(item);
            state.todoItems.push(item)
            localStorage.setItem(item.uuid, JSON.stringify(item));
        },
        removeItem(state, uuid) {
            const idx = state.todoItems.findIndex(f => f.uuid === uuid)
            if( idx !== -1 ) {
                state.todoItems.splice(idx, 1)
                localStorage.removeItem(uuid);
            }
        },
        toggleComplete(state, uuid) {
            const idx = state.todoItems.findIndex(f => f.uuid === uuid)
            if( idx !== -1 ) {
                state.todoItems[idx].completed = !state.todoItems[idx].completed
                const data = JSON.parse(localStorage.getItem(uuid))
                data.completed = !data.completed
                localStorage.setItem(uuid, JSON.stringify(data)) // localStorage는 string 만 저장가능
            }
        },
        clearItems(state) {
            state.todoItems = []
            localStorage.clear()
        }
    }
})