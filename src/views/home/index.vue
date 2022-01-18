<template>
  <n-loading-bar-provider>
    <div :class="$style.container">
      <app-header />
      <router-view></router-view>
    </div>
  </n-loading-bar-provider>
</template>

<script>
export default {
  name: 'Home',
};
</script>

<script setup>
import AppHeader from './AppHeader.vue';
import { NLoadingBarProvider } from 'naive-ui';
</script>

<style module>
.container {
  position: relative;
  z-index: 0;
  height: 100%;
}
</style>
