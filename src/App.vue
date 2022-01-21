<template>
  <div class="site-container">
    <SiteHeader></SiteHeader>
    <div id="banner"></div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<script setup>
import SiteHeader from '@/components/SiteHeader.vue';
</script>

<style lang="scss" scoped>
.site-container {
  min-width: $siteMinWidth;
  position: relative;
  z-index: 0;
  #banner {
    width: 100%;
  }

  .content {
    max-width: $siteMaxWidth;
    margin: 0 auto;
    padding: 0 20px;
  }
}
</style>
