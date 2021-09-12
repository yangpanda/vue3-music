<template>
  <div
    class="
      flex flex-shrink-0
      shadow
      justify-center
      items-center
      w-full
      bg-gray-200
      overflow-hidden
    "
    :class="{
      'rounded-none': round === 'none',
      'rounded-sm': round === 'small',
      rounded: round === 'normal',
      'rounded-md': round === 'middle',
      'rounded-lg': round === 'large',
      'rounded-full': round === 'full',
      'w-full': !((width && height) || size),
    }"
    :style="{
      width: imageWidth,
      height: imageHeight,
    }"
  >
    <img class="image" v-lazy="src" />
    <div
      v-if="!height"
      class="w-0 h-0"
      :style="{ paddingTop: paddingHeight }"
    ></div>
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

<style scoped>
.image[lazy="loaded"] {
  width: 100%;
  animation: fadein 1s both;
}
</style>
