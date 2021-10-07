<template>
  <div
    class="shadow"
    :class="[$style.imageWrap, {
      'rounded-none': round === 'none',
      'rounded-sm': round === 'small',
      rounded: round === 'normal',
      'rounded-md': round === 'middle',
      'rounded-lg': round === 'large',
      'rounded-full': round === 'full',
      [$style.w100]: !((width && height) || size),
    }]"
    :style="{
      width: imageWidth,
      height: imageHeight,
    }"
  >
    <img :class="$style.image" v-lazy="src" />
    <div v-if="!height" :style="{ paddingTop: paddingHeight, width: 0, height: 0 }"></div>
  </div>
</template>

<script setup>
const props = defineProps({
  src: String,
  ratio: {
    type: String,
    default: "1 / 1",
  },
  width: String,
  height: String,
  size: String,
  round: {
    type: String,
    default: "none",
  },
});

let paddingHeight = `calc(100% / (${props.ratio}))`;
let imageWidth = "";
let imageHeight = "";

if (props.height) {
  paddingHeight = props.height.indexOf("px")
    ? `${props.height}`
    : `${prop.height}px`;
}

if (props.width && props.height) {
  imageWidth = props.width.indexOf("px") ? `${props.width}` : `${prop.width}px`;
  imageHeight = props.height.indexOf("px")
    ? `${props.height}`
    : `${prop.height}px`;
} else {
  imageWidth = `${props.size}px`;
  imageHeight = `${props.size}px`;
}
</script>

<style module>
.imageWrap {
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: lightgray;
  overflow: hidden;
}
.image[lazy="loaded"] {
  width: 100%;
  animation: fadein 1s both;
}

.w-100 {
  width: 100%;
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
