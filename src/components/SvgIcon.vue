<template>
  <svg class="svg-icon" aria-hidden="true" :style="svgStyle">
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

const symbolId = computed(() => '#icon-' + props.name);
const svgStyle = computed(() => {
  return {
    color: props.color,
    width: props.size + 'px',
    height: props.size + 'px',
  };
});
</script>

<style scoped>
.svg-icon {
  fill: currentColor;
}
</style>
