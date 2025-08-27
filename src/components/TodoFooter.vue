<template>
  <div class="clearAllContainer">
    <span v-on:click="clearAll" class="clearAllBtn">Clear All</span>
  </div>
</template>

<script>
export default {
    methods: {
        clearAll: function() {
            this.$emit('clearAllList')
        }
    },
}
</script>

<style>
.clearAllContainer {
    widows: 0.5rem;
    height: 50px;
    line-height: 50px;
    background-color: white;
    border-radius: 5px;
    margin: 0 auto;
    font-weight: 700;
}
.clearAllBtn {
    color: #e23030;
    display: block;
}
</style>