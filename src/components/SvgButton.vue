<template>
  <div :class="['wrapper', box ? 'box' : '']">
    <svg-icon :class="triangle ? 'triangle' : ''" :name="name" :size="size" :color="color" />
  </div>
</template>

<script setup>
const props = defineProps({
  name: String,
  size: { type: Number, default: 24 },
  color: { type: String, default: '#333' },
  box: { type: Boolean, default: false },
  triangle: { type: Boolean, default: false },
})
</script>

<style scoped lang="postcss">
.wrapper {
  @apply flex justify-center items-center cursor-pointer shadow;
}

.box {
  @apply bg-gray-200 bg-opacity-90 p-1 rounded-full;
}
.triangle {
  @apply transform translate-x-px
}
</style>