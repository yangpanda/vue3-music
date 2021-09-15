<template>
  <div ref="container" class="relative z-0 h-full w-full">
    <div class="absolute top-0 bottom-20 w-full flex">
      <div class="sidebar h-full border-r flex-shrink-0">
        <the-sidebar></the-sidebar>
      </div>
      <div class="h-full flex-grow">
        <n-scrollbar ref="scrollbar">
          <router-view :key="$route.fullPath"></router-view>
          <n-back-top v-if="container" :right="20" :bottom="100" :to="container"/>
        </n-scrollbar>
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
import { NScrollbar, NBackTop } from "naive-ui"
import { ref, provide, onMounted } from 'vue'

const container = ref(null)
const scrollbar = ref(null)

provide('backTop', () => scrollbar.value.scrollTo({top: 0}))
onMounted(() => {
})
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