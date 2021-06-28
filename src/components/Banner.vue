<template>
  <el-carousel class="banner" :interval="3000" type="card" height="200px">
    <el-carousel-item v-for="(banner, index) in banners" :key="index">
      <the-image :src="banner.pic" ratio="18 / 7" />
    </el-carousel-item>
  </el-carousel>
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
</style>
