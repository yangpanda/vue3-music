<template>
  <div :class="$style.container">
    <n-pagination></n-pagination>
  </div>
</template>

<script>
export default {
  name: 'ThePagination',
};
</script>

<script setup>
import { NPagination } from 'naive-ui';
import { reactive } from 'vue';

cosnt state = reactive({

})
</script>

<style module>
.container {
  display: flex;
  width: 100%;
  justify-content: center;
  padding: 0 20px;
}
</style>
