<template>
  <div class="wrapper">
    <n-layout position="absolute">
      <n-layout-header class="header">
        <router-link class="home-link" to="/">
          <svg-icon
            iconName="#icon-logo"
            iconColor="#ec4141"
            container
            style="margin-right: 5px"
          />
          <span class="title">网易云音乐</span>
        </router-link>
        <login />
      </n-layout-header>
      <n-layout class="center" has-sider position="absolute">
        <n-layout-sider bordered :native-scrollbar="false">
          <sidebar></sidebar>
        </n-layout-sider>
        <n-layout-content
          :native-scrollbar="false"
        >
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
import Sidebar from "components/Sidebar.vue";
import Login from "components/Login.vue";
import Player from "components/Player.vue";

import {
  NLayout,
  NLayoutHeader,
  NLayoutSider,
  NLayoutContent,
  NLayoutFooter,
} from "naive-ui";

export default {
  components: {
    Sidebar,
    Player,
    NLayout,
    NLayoutHeader,
    NLayoutSider,
    NLayoutContent,
    NLayoutFooter,
    Login,
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  height: 100%;
  position: relative;

  .header {
    height: var(--header-height);
    padding: 0 20px;
    background-color: var(--red-color);
    display: flex;
    justify-content: space-between;
    align-items: center;

    .home-link {
      display: flex;
      align-items: center;
      cursor: pointer;
      font-size: 18px;
      color: #fff;
      text-decoration: none;

      .logo {
        margin-right: 5px;
      }
    }
  }

  .center {
    top: var(--header-height);
    bottom: var(--footer-height);
  }

  .footer {
    height: var(--footer-height);
  }
}
</style>