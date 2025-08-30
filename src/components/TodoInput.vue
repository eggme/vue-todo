<template>
  <div class="inputBox shadow">
    <input type="text" v-model = "todoValue" v-on:keyup.enter="addTodo"> <!-- keyup, enter를 눌렀을 때 동작 -->
    <span v-on:click="addTodo" class="addContainer">
        <i class="fa-solid fa-plus addBtn"></i>
    </span>

     <CommonModal v-if="showModal" @close="showModal = fasle" >
        
        <h3 slot="header">경고</h3> <!-- slot 은 Vue의 기능인데, 컴포넌트의 일부 UI들을 재사용할 수 있는 기능 -->
        <p slot="body">글자를 입력해주세요</p>
        <div slot="footer" style="display:flex;">
            <div class="yes_modal_answer" @click="closeModal" style="flex: 1;">
                확인
            </div>
        </div>
    </CommonModal>
  </div>
</template>

<script>
import CommonModal from './common/CommonModal.vue'

export default {
    data() {
        return {
            showModal: false,
            todoValue: ''
        }
    },
    components: {
        CommonModal
    },
    methods: {
        closeModal() {
            this.showModal = false
        },
        addTodo() {
            if( this.todoValue != '') {
                const obj = {
                    uuid:  crypto.randomUUID(),
                    completed: false,
                    value : this.todoValue,
                    regdt : new Date()
                }
                this.$store.commit('pushItem', obj)
                this.clearInput()
            } else {
                this.showModal = true
            }
        },
        clearInput() {
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
    display: flex;
    background: white;
    height: 50px;
    line-height: 50px;
    border-radius: 5px;
}
.inputBox input {
    border-style: none;
    font-size: 0.9rem;
    flex: 1;
    padding: 0 8px;
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