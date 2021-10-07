<template>
  <span :class="[$style.wrap, box ? $style.box : '']">
    <svg-icon :class="triangle ? $style.triangle : ''" :name="name" :size="size" :color="color" />
  </span>
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

<style module>
.wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.box {
  background-color: rgba(220, 220, 220, 0.8);
  padding: .3em;
  border-radius: 50%;
}
.triangle {
  transform: translateX(1.5px);
}
</style>