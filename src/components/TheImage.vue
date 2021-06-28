<template>
  <div
    class="image-wrapper shadow"
    :style="{
      paddingTop: ratioHeight,
      borderRadius: borderRadius,
      width: imageWidth,
    }"
  >
    <img class="image" v-lazy="src" alt="..." />
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
      default: "1 * 1",
    },
    radius: {
      type: String,
      default: "8px",
    },
    width: {
      type: String,
    },
  },
  data() {
    return {
      ratioHeight: `calc(100% / ${this.ratio})`,
      borderRadius: `${this.radius}`,
      imageWidth: `${this.width}`,
    };
  },
};
</script>

<style lang="scss" scoped>
.image-wrapper {
  position: relative;
  overflow: hidden;
  width: 100%;
  border-radius: 8px;
  background-color: #cecbcb;

  .image {
    position: absolute;
    left: 0;
    top: 0;
    display: block;
    width: 100%;
  }
}
</style>