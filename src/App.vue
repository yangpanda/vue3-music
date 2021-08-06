<template>
  <n-layout position="absolute">
    <n-layout-header class="header">
      <the-header />
    </n-layout-header>
    <n-layout class="center" has-sider position="absolute">
      <n-layout-sider bordered :native-scrollbar="false">
        <the-sidebar />
      </n-layout-sider>
      <n-layout-content :native-scrollbar="false">
        <router-view :key="$route.fullPath"></router-view>
      </n-layout-content>
    </n-layout>
    <n-layout-footer position="absolute">
      <the-player />
    </n-layout-footer>
  </n-layout>
</template>

<script>
import TheHeader from "@/components/TheHeader.vue";
import TheSidebar from "@/components/TheSidebar.vue";
import ThePlayer from "@/components/ThePlayer.vue";

import {
  NLayout,
  NLayoutHeader,
  NLayoutSider,
  NLayoutContent,
  NLayoutFooter,
} from "naive-ui";

export default {
  components: {
    TheHeader,
    TheSidebar,
    ThePlayer,
    NLayout,
    NLayoutHeader,
    NLayoutSider,
    NLayoutContent,
    NLayoutFooter,
  },
};
</script>

<style lang="scss" scoped>
.center {
  top: var(--header-height);
  bottom: var(--footer-height);
}
</style>
