<template>
  <div
    class="image-wrapper shadow"
    :style="{
      borderRadius: borderRadius,
      width: imageWidth,
      height: imageHeight,
    }"
  >
    <img class="image" v-lazy="src" alt="..." />
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
  overflow: hidden;
  width: 100%;
  background-color: #cecbcb;

  .image {
    display: block;
    width: 100%;
    height: 100%;
  }

  .after {
    width: 0;
    height: 0;
  }
}
</style>
