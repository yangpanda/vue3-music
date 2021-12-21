<template>
  <div :class="$style.container">
    <img :class="[$style.needle, running ? $style.run : '']" :src="needlePic" alt="needle" />
    <div :class="[$style.cd, !running ? $style.pause : '']">
      <div
        :class="$style.bg"
        :style="{
          'background-image': 'url(' + cdPic + ')',
        }"
      ></div>
      <img :class="$style.cover" :src="picSizeUrl(src, 300)" />
    </div>
  </div>
</template>

<script>
import cdPic from '@/assets/pictures/cd.png';
import needlePic from '@/assets/pictures/needle.png';
import { picSizeUrl } from '@/utils/picture';

export default {
  name: 'RotateCd',
  props: {
    src: '',
    running: false,
  },
  data() {
    return {
      cdPic,
      needlePic,
    };
  },
  methods: {
    picSizeUrl,
  },
};
</script>

<style module>
.container {
  position: relative;
  z-index: 0;
  min-width: 300px;
}
.needle {
  position: absolute;
  width: 90px;
  height: 146px;
  z-index: 10;
  left: 45%;
  top: -30%;
  transition: all;
  transition-duration: 0.5s;
  transform-origin: left top;
  transform: rotate(-25deg);
}
.run {
  transform: rotate(0);
}
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
  animation: rotate 20s linear infinite;
}
.cd::after {
  content: '';
  width: 0;
  height: 0;
  padding-top: 100%;
}
.bg {
  width: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
}
.cover {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 65%;
  border-radius: 50%;
}
.pause {
  animation-play-state: paused;
}
</style>
