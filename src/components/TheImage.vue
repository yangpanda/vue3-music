<template>
  <div
    :class="$style.imageWrap"
    :style="{
      width: imageWidth,
      height: imageHeight,
      borderRadius: borderRadius,
    }"
  >
    <img :class="$style.image" v-lazy="src" />
    <div v-if="!height" :style="{ paddingTop: paddingHeight, width: 0, height: 0 }"></div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  src: String,
  ratio: {
    type: String,
    default: '1 / 1',
  },
  width: [String, Number],
  height: [String, Number],
  size: [String, Number],
  radius: [String, Number],
});

const paddingHeight = computed(() => {
  if (props.height) {
    return props.height + 'px';
  } else {
    return `calc(100% / (${props.ratio}))`;
  }
});

const imageWidth = computed(() => {
  if (props.size) {
    return props.size + 'px';
  }
  if (props.width) {
    return props.width + 'px';
  }
});
const imageHeight = computed(() => {
  if (props.size) {
    return props.size + 'px';
  }
  if (props.height) {
    return props.height + 'px';
  }
});
const borderRadius = computed(() => {
  if (props.radius === 'full') {
    return '50%';
  } else {
    return props.radius + 'px';
  }
});
</script>

<style module>
.imageWrap {
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: lightgray;
  position: relative;
  overflow: hidden;
  box-shadow: 1px 1px 20px 6px rgba(0, 0, 0, 0.1);
}
.image {
  position: absolute;
  left: 0;
  right: 0;
}
.image[lazy='loaded'] {
  width: 100%;
  animation: fadein 1s both;
}
@keyframes fadein {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
@keyframes fadeout {
  100% {
    display: block;
  }

  0% {
    display: none;
  }
}
</style>
