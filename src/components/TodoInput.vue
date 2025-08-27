<template>
  <div class="inputBox shadow">
    <input type="text" v-model = "todoValue" v-on:keyup.enter="addTodo"> <!-- keyup, enter를 눌렀을 때 동작 -->
    <span v-on:click="addTodo" class="addContainer">
        <i class="fa-solid fa-plus addBtn"></i>
    </span>
  </div>
</template>

<script>
export default {
    data: function () {
        return {
            todoValue: ''
        }
    },
    methods: {
        addTodo: function() {
            if( this.todoValue != '') {
                const obj = {
                    uuid:  crypto.randomUUID(),
                    completed: false,
                    value : this.todoValue,
                    regdt : new Date()
                }
                this.$emit('addTodoList', obj)
                this.clearInput()
            }
        },
        clearInput: function() {
            this.todoValue = ''
        },
    }
}
</script>

<style scoped>
input:focus {
    outline: none;
}
.inputBox {
    background: white;
    height: 50px;
    line-height: 50px;
    border-radius: 5px;
}
.inputBox input {
    border-style: none;
    font-size: 0.9rem;
}
.addContainer {
    float: right;
    background: linear-gradient(to right, #6478FB, #8763FB);
    display: block;
    width: 3rem;
    border-radius: 0 5px 5px 0;
}
.addBtn {
    color: white;
    vertical-align: middle;
}
</style>