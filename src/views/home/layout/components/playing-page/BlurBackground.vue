<template>
  <div
    class="w-full h-full bg-white bg-no-repeat bg-fixed bg-top"
    :style="{
      'background-image': 'url(' + src + ')',
      'background-size': '100% 100px',
    }"
  >
    <div
      class="relative top-0 left-0 right-0 bottom-0 bg-white bg-opacity-80 backdrop-filter backdrop-blur-3xl"
    >
      <slot default></slot>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  src: String,
});
</script>

<style scoped>
</style>