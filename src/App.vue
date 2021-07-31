<template>
  <div class="wrapper">
    <n-layout position="absolute">
      <n-layout-header class="header">
        <the-header />
      </n-layout-header>
      <n-layout class="center" has-sider position="absolute">
        <n-layout-sider bordered :native-scrollbar="false">
          <sidebar></sidebar>
        </n-layout-sider>
        <n-layout-content :native-scrollbar="false">
          <router-view :key="$route.fullPath"></router-view>
        </n-layout-content>
      </n-layout>
      <n-layout-footer position="absolute">
        <player></player>
      </n-layout-footer>
    </n-layout>
  </div>
</template>

<script>
import TheHeader from "@/components/TheHeader.vue";
import Sidebar from "@/components/Sidebar.vue";
import Player from "@/components/Player.vue";

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
    Sidebar,
    Player,
    NLayout,
    NLayoutHeader,
    NLayoutSider,
    NLayoutContent,
    NLayoutFooter,
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  height: 100%;

  .center {
    top: var(--header-height);
    bottom: var(--footer-height);
  }

  .footer {
    height: var(--footer-height);
  }
}
</style>
