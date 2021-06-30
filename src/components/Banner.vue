<template>
  <div class="swiper">
    <div class="wrapper">
      <the-image
        class="image"
        v-for="(banner, index) in banners"
        :key="index"
        :src="banner.pic + '?param=540y200'"
        ratio="27 / 10"
        radius="6px"
        width="540px"
        height="200px"
      />
      <button class="button pre">pre</button>
      <button class="button next">next</button>
    </div>
    <div class="navigation"></div>
  </div>
</template>

<script>
import { ref } from "vue";
import { fetchBanners } from "api/methods.js";
import TheImage from "components/TheImage.vue";

export default {
  name: "Banner",
  components: {
    TheImage,
  },
  data() {
    return {};
  },
  setup() {
    const banners = ref([]);
    const getBanners = async () => {
      const res = await fetchBanners(2);
      banners.value = res.banners;
    };

    return {
      banners,
      getBanners,
    };
  },
  beforeCreate() {
    this.getBanners();
  },
};
</script>

<style lang="scss" scoped>
.swiper {
  .wrapper {
    position: relative;
    height: 200px;
    overflow: hidden;

    .button {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }
    .pre {
      left: 0;
    }
    .next {
      right: 0;
    }

    .image {
      position: absolute;
      display: inline-block;
      // position: absolute;
      // left: 0;
      // top: 0;
    }
  }
}
</style>
