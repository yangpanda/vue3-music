<template>
  <div ref="container" :class="$style.container">
    <n-scrollbar ref="scrollbar">
      <slot></slot>
      <n-back-top v-if="scrollbar && container" right="20" bottom="20" :to="container"></n-back-top>
    </n-scrollbar>
  </div>
</template>

<script>
import { NScrollbar, NBackTop } from 'naive-ui';
import { ref } from 'vue';

export default {
  name: 'TheScrollbar',
  components: {
    NScrollbar,
    NBackTop,
  },
  setup() {
    const container = ref(null)
    const scrollbar = ref(null)

    return {
      container,
      scrollbar
    }
  },
};
</script>

<style module>
.container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  /* 改变 n-back-top 的定位容器为 container */
  transform: translate(0);
}
</style>