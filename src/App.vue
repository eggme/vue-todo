<template>
  <div id="app">
    <TodoHeader></TodoHeader>
    <TodoInput v-on:addTodoList="propagateProps"></TodoInput>
    <TodoList v-bind:items="totalItems" v-on:toggle-complete="toggleComplete" v-on:remove-todo="removeTodo"></TodoList>
    <TodoFooter v-on:clearAllList="clearAllList" v-bind:items="totalItems"></TodoFooter>
  </div>
</template>

<script>
import TodoFooter from './components/TodoFooter.vue';
import TodoHeader from './components/TodoHeader.vue';
import TodoInput from './components/TodoInput.vue';
import TodoList from './components/TodoList.vue';

export default {
  components: {
    TodoHeader,
    TodoFooter,
    TodoList,
    TodoInput,
  },
  data() {
    return {
      todoItems: []
    }
  },
  computed: {
    totalItems() {
      return [...this.todoItems].sort((a, b) => {
        if (!a.regdt) return 1
        if (!b.regdt) return -1     
        return new Date(b.regdt) - new Date(a.regdt)
      })
    }
  },
  mounted() {
    const that = this
    that.refreshList();
  },
  methods: {
    refreshList() {
        this.todoItems = [];
        const copiedLocalStorages = Object.fromEntries(
            Object.keys(localStorage).map(k => {
                return [k, {...JSON.parse(localStorage.getItem(k))}]
            })
        )
        for(const key in copiedLocalStorages) {
            this.todoItems.push({...JSON.parse(localStorage.getItem(key))})
        }  
    },
    clearAllList() {
        this.todoItems = []
        localStorage.clear()
    },
    propagateProps(v) {
        this.todoItems.push(v);
        localStorage.setItem(v.uuid, JSON.stringify(v));
    },
    removeTodo(uuid) {
      console.log("remove Todo~~~", uuid);
      const idx = this.todoItems.findIndex(f => f.uuid === uuid)
      if( idx !== -1 ) {
        this.todoItems.splice(idx, 1)
        localStorage.removeItem(uuid);
      }
    },
    toggleComplete(uuid) {
      console.log("toggleComplete~~~~");
      
      const idx = this.todoItems.findIndex(f => f.uuid === uuid)
      if( idx !== -1 ) {
        this.todoItems[idx].completed = !this.todoItems[idx].completed
        const data = JSON.parse(localStorage.getItem(uuid))
        data.completed = !data.completed
        localStorage.setItem(uuid, JSON.stringify(data)) // localStorage는 string 만 저장가능
      }
    }
  }
}
</script>

<style>
body {
  text-align: center;
  background-color: #f6f6f6;
}
input {
  border-style: groove;
  width: 200px;
}
button {
  border-style : groove;
}
.shodow {
  box-shadow: 5px 10px 1px rgba(0, 0, 0, 0.03);
}
</style>
