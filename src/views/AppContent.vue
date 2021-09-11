<template>
  <div class="relative z-0 h-full w-full">
    <div class="absolute top-0 bottom-20 w-full flex">
      <div class="sidebar h-full border-r flex-shrink-0">
        <keep-alive>
          <component :is="TheSidebar"></component>
        </keep-alive>
      </div>
      <div class="h-full flex-grow">
        <scroll-bar>
          <router-view :key="$route.fullPath"></router-view>
        </scroll-bar>
      </div>
    </div>
    <div
      class="absolute left-0 bottom-0 w-full h-0 pb-20 transition-all duration-500 z-10 bg-white"
      :class="{ 'h-full': showPlayingPage }"
    >
      <playing-page></playing-page>
    </div>
    <div class="absolute bottom-0 w-full border-t z-20">
      <the-player />
    </div>
  </div>
</template>

<script setup>
import TheSidebar from "@/components/TheSidebar.vue";
import ThePlayer from "@/components/ThePlayer.vue";
import PlayingPage from "@/components/PlayingPage/PlayingPage.vue";

import { mapState } from '@/lib/lib.js'

const {
  showPlayingPage
} = mapState();
</script>

<style scoped>
.sidebar {
  width: 240px;
}
@media screen and (min-width: 1300px) {
  .sidebar {
    width: 300px;
  }
}
</style>