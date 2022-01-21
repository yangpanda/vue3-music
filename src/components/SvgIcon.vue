<template>
  <svg class="svg-icon" aria-hidden="true" :width="size" :height="size" :style="style">
    <use :xlink:href="symbolId" />
  </svg>
</template>

<script>
export default {
  name: 'SvgIcon',
};
</script>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  color: {
    type: String,
    default: '#000',
  },
  size: {
    type: [Number, String],
    default: 22,
  },
  name: String,
});

const symbolId = computed(() => `#icon-${props.name}`);
const style = computed(() => {
  return {
    color: props.color,
  };
});
</script>

<style>
.svg-icon {
  fill: currentColor;
}
</style>
