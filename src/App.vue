<template>
  <div class="site-container">
    <SiteHeader></SiteHeader>
    <router-view></router-view>
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
}
</style>
