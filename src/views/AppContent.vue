<template>
  <div class="relative z-0 h-full w-full">
    <div class="absolute top-0 bottom-20 w-full flex">
      <div class="sidebar h-full border-r flex-shrink-0">
        <the-sidebar></the-sidebar>
      </div>
      <div class="h-full flex-grow">
        <scroll-bar>
          <router-view :key="$route.fullPath"></router-view>
        </scroll-bar>
      </div>
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

</script>

<style scoped>
.sidebar {
  width: 200px;
}
@media screen and (min-width: 1280px) {
  .sidebar {
    width: 260px;
  }
}
@media screen and (min-width: 1536px) {
  .sidebar {
    width: 300px;
  }
}
</style>