<template>
  <div
    class="animate-cd-rotate relative rounded-full bg-black bg-opacity-10"
    :class="{
      pause: !running,
    }"
  >
    <div
      class="h-full w-full bg-no-repeat bg-center"
      :style="{
        'background-image': 'url(' + cdPic + ')',
        'background-size': '90%',
      }"
    ></div>
    <img
      class="
        absolute
        top-1/2
        left-1/2
        w-7/12
        rounded-full
        transform
        -translate-x-1/2 -translate-y-1/2
      "
      :src="src + '?param=100y100'"
    />
  </div>
</template>

<script setup>
import cdPic from "@/assets/pictures/cd.png";

const props = defineProps({
  src: String,
  running: {
    type: Boolean,
    default: true,
  },
});
</script>

<style scoped>
.pause {
  animation-play-state: paused;
}
</style>