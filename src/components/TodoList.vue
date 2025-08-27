<template>
  <div>
    <ul>
        <li  v-for="(item, i) in items" v-bind:key="i" class="shadow">
            <span class="todoItem" v-on:click="toggleCompelte(item.uuid)">
                <span class="checkBtn" v-bind:class="{checkBtnCompleted:item.completed}">
                    <i class="fa-solid fa-check"></i>
                </span>
                <span v-bind:class="{textCompleted: item.completed}" >{{ item.value }}</span>
            </span>
            <span class="removeBtn" v-on:click="removeTodo(item.value, item.uuid)">
                <i class="fa-solid fa-trash-can"></i>
            </span>
        </li>
    </ul>
  </div>
</template>

<script>
export default {
    props: ["items"],
    methods: {
        removeTodo: function(v, uuid) {
            this.$emit('remove-todo', uuid)
        },
        toggleCompelte: function (uuid) {
            this.$emit('toggle-complete', uuid)
        },
    }
}
</script>

<style scoped>
ul {
   list-style-type: none; 
   padding-left: 0px;
   margin-top : 0;
   text-align: left;
}

li {
    display: flex;
    min-height: 50px;
    height: 50px;
    line-height: 50px;
    margin: 0.5rem 0;
    padding: 0 0.5rem;
    background: white;
    border-radius: 5px;
}
.checkBtn {
    line-height: 45px;
    color : #62acde;
    margin-right: 5px;
}
.todoItem {
    flex: 1;
}
.todoItem:hover .checkBtn {
    color : #ff6161;
}
.checkBtnCompleted {
    color : #b3adad;
}
.textCompleted {
    text-decoration: line-through;
    color: #b3adad;
}
.removeBtn {
    margin-left: auto;
    color : #de4343;
}
</style>