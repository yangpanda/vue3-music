<template>
  <n-icon :color="color" :size="size" :depth="depth">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <use :xlink:href="symbolId" />
    </svg>
  </n-icon>
</template>

<script>
export default {
  name: 'TheName',
};
</script>

<script setup>
import { NIcon } from 'naive-ui';
import { computed } from 'vue';

const props = defineProps({
  color: {
    type: String,
    default: '#333',
  },
  size: {
    type: [Number, String],
    default: 22,
  },
  depth: Number,
  name: String,
});

const symbolId = computed(() => '#icon-' + props.name);
</script>
