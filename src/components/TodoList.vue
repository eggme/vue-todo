<template>
  <div>
    <transition-group name="list" tag="ul" class="todo-list">
        <li  v-for="(item, i) in totalItems" v-bind:key="i" class="shadow todo-item">
            <span class="todoItem" v-on:click="toggleComplete(item.uuid)">
                <span class="checkBtn" v-bind:class="{checkBtnCompleted:item.completed}"> <!-- v-bind:class로 해당 값이 true일 떄만 클래스를 추가하거나 삭제할 수 있음 -->
                    <i class="fa-solid fa-check"></i>
                </span>
                <span v-bind:class="{textCompleted: item.completed}" >{{ item.value }}</span>
            </span>
            <span class="removeBtn" v-on:click="openModal(item.uuid)">
                <i class="fa-solid fa-trash-can"></i>
            </span>
        </li>
    </transition-group>
    <CommonModal v-if="showModal" @close="showModal = fasle" >
        
        <h3 slot="header">
            경고!
            <!-- <i class="fa-solid fa-xmark closeModalBtn"></i> -->
            </h3> <!-- slot 은 Vue의 기능인데, 컴포넌트의 일부 UI들을 재사용할 수 있는 기능 -->
        <p slot="body">정말 지우시겠습니까?</p>
        <div slot="footer" style="display:flex;">
            <div class="yes_modal_answer" v-on:click="removeTodo" style="flex: 1;">
                예
            </div>
            <div class="no_modal_answer"  v-on:click="closeModal" style="flex: 1">
                아니요
            </div>
        </div>
    </CommonModal>
  </div>

  <!-- 템플릿을 모듈화하려면 x-template을 써야함  -->
  <!-- 
  <script type="text/x-template" id="modal-template">
      <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-container">

              <div class="modal-header">
                <slot name="header">
                  default header
                </slot>
              </div>

              <div class="modal-body">
                <slot name="body">
                  default body
                </slot>
              </div>

              <div class="modal-footer">
                <slot name="footer">
                  default footer
                  <button class="modal-default-button" @click="$emit('close')">
                    OK
                  </button>
                </slot>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </script> 
    -->
</template>

<script>
import CommonModal from './common/CommonModal.vue';
import { mapGetters, mapMutations } from 'vuex';


export default {
    data() {
        return {
            showModal: false,
            removeTargetUuid : null,
        }
    },
    components: {
        CommonModal
    },
    computed: {
      ...mapGetters({
        totalItems: 'totalItems',
        // 위와 아래는 같음
      })
      // ...mapGetters(['totalItems'])
    },
    methods: {
        closeModal() {
            this.showModal = false
        },
        openModal(uuid) {
            this.removeTargetUuid = uuid
            this.showModal = !this.showModal
        },
        ...mapMutations(['removeItem', 'toggleComplete']),
        removeTodo() {
            this.showModal = false
            this.removeItem(this.removeTargetUuid)
            // this.$store.commit('removeItem', this.removeTargetUuid); // mutations은 무조건 commit 으로 실행
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
    position: relative;
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

.todo-list {
  position: relative;
}
/* 리스트 아이템 트렌지션 효과 */
.list-enter-active, .list-leave-active {
  transition: all 1s ease;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
</style>