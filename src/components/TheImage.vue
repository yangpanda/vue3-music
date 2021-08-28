<template>
  <div
    class="image-wrapper shadow"
    :style="{
      borderRadius: borderRadius,
      width: imageWidth,
      height: imageHeight,
    }"
  >
    <img class="image" v-lazy="src"/>
    <div
      v-if="!height"
      class="after"
      :style="{ paddingTop: paddingHeight }"
    ></div>
  </div>
</template>

<script>

export default {
  name: "TheImage",
  props: {
    src: {
      type: String,
    },
    ratio: {
      type: String,
      default: "1 / 1",
    },
    radius: {
      type: String,
      default: "4px",
    },
    width: {
      type: String,
    },
    height: {
      type: String,
    },
  },
  data() {
    return {
      paddingHeight: `calc(100% / (${this.ratio}))`,
      borderRadius: `${this.radius}`,
      imageWidth: `${this.width}`,
      imageHeight: `${this.height}`,
    };
  },
};
</script>

<style lang="scss" scoped>
.image-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  width: 100%;
  background-color: #cecbcb;

  .image {
    display: block;
  }
  .image[lazy=loaded] {
    width: 100%;
    animation: fadein 1s both;
  }
  .after {
    width: 0;
    height: 0;
  }
}
</style>
