<template>
  <div :class="[$style.cd, !running ? $style.pause : '' ]">
    <div :class="$style.bg" :style="{
      'background-image': 'url(' + cdPic + ')',
    }"></div>
    <img :class="$style.cover" :src="src + '?param=100y100'" />
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

<style module>
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.cd {
  display: flex;
  position: relative;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.2);
  min-width: 300px;
  animation: rotate 20s linear infinite;
}
.cd::after {
  content: " ";
  width: 0;
  height: 0;
  padding-top: 100%;
}
.bg {
  width: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 90%;
}
.cover {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60%;
  border-radius: 50%;
}
.pause {
  animation-play-state: paused;
}
</style>