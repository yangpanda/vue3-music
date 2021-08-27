<template>
  <div
    class="image-wrapper shadow"
    :style="{
      borderRadius: borderRadius,
      width: imageWidth,
      height: imageHeight,
    }"
    v-lazy-container="{ selector: 'img', error: errorImg, loading: loadingImg }"
  >
    <img class="image" :data-src="src" alt="..." />
    <div
      v-if="!height"
      class="after"
      :style="{ paddingTop: paddingHeight }"
    ></div>
  </div>
</template>

<script>
import loadingUrl from '@/assets/icons/loading.svg'
import errorUrl from '@/assets/icons/error.svg'

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
    loadingImg: {
      type: String,
      default: loadingUrl
    },
    errorImg: {
      type: String,
      default: errorUrl,
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
@keyframes fadein {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
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

  .image[lazy=loading] {
    width: 40%;
  }
  .image[lazy=loaded] {
    width: 100%;
    animation: fadein 1s both;
  }
  .image[lazy=error] {
    width: 40%;
  }

  .after {
    width: 0;
    height: 0;
  }
}
</style>
