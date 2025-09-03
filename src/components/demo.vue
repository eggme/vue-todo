<template>
  <div id="root">
    <p>{{ this.originPrice }}</p>
    <p>{{ this.doublePrice }}</p>
    <p>{{ this.triplePrice }}</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    computed: {
        ...mapGetters(['originPrice', 'doublePrice', 'triplePrice'])
    }
}
</script>

<style>

</style>