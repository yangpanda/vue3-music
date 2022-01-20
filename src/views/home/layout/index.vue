<template>
  <div :class="$style.layout">
    <!-- 中间 -->
    <div :class="$style.top">
      <the-sidebar></the-sidebar>
      <div :class="$style.content">
        <router-view :key="routeKey"></router-view>
      </div>
      <div :class="[$style.playingPage, playingPageDisplayStatus ? $style.active : '']">
        <playing-page></playing-page>
      </div>
    </div>
    <!-- 底部播放器 -->
    <the-player />
  </div>
</template>

<script>
export default {
  name: 'Layout',
};
</script>

<script setup>
import PlayingPage from './PlayingPage/index.vue';
import TheSidebar from './TheSidebar/index.vue';
import ThePlayer from './ThePlayer.vue';
import { computed } from 'vue';
import { useMapState } from '@/composables';
import { useRoute } from 'vue-router';

const { playingPageDisplayStatus } = useMapState('player');

const route = useRoute();
const routeKey = computed(() => {
  if (!(route.path.indexOf('discovery') != -1)) {
    return route.path;
  }
});
</script>

<style module>
.layout {
  position: relative;
  height: 100%;
  padding-top: 50px;
}
.top {
  position: relative;
  z-index: 0;
  display: flex;
  width: 100%;
  height: 100%;
  padding-bottom: 80px;
}
.content {
  flex-grow: 1;
  height: 100%;
}
.playingPage {
  position: absolute;
  left: 0;
  bottom: 80px;
  z-index: 10;
  background-color: white;
  width: 100%;
  height: 0;
  transition-property: all;
  transition-duration: 1000ms;
}
.active {
  height: calc(100% - 80px);
}
</style>
