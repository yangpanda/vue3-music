<template>
  <div
    class="image-wrapper shadow"
    :style="{
      borderRadius: borderRadius,
      width: imageWidth,
    }"
  >
    <img class="image" v-lazy="src" alt="..." />
    <div class="after" :style="{ paddingTop: paddingHeight }"></div>
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
      default: "8px",
    },
    width: {
      type: String,
    },
  },
  data() {
    return {
      paddingHeight: `calc(100% / ${this.ratio})`,
      borderRadius: `${this.radius}`,
      imageWidth: `${this.width}`,
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
  }

  .after {
    width: 100%;
    height: 0;
  }
}
</style>
