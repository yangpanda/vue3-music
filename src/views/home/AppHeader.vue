<template>
  <div :class="$style.header">
    <div :class="$style.homeBtn" @click="toHome">
      <the-icon name="logo" size="32"></the-icon>
      <div>蜗牛音乐</div>
    </div>
    <search-bar />
    <div :class="$style.right">
      <n-button text v-if="!loginStatus" @click="toLogin">登录</n-button>
      <div v-else :class="$style.userInfo">
        <n-avatar :size="30" round :src="profile.avatarUrl" />
        <n-popover trigger="click" placement="bottom-end" style="width: 300px">
          <template #trigger>
            <div :class="$style.userName">
              {{ profile.nickname }}
              <the-icon name="arrow-down" size="14" />
            </div>
          </template>
          <n-button block @click="logout">退出登录</n-button>
        </n-popover>
      </div>
      <a :class="$style.link" href="https://github.com/yangpanda/vue3-pc-netease-music" target="_blank">
        <the-icon name="github" size="32"></the-icon>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppHeader',
};
</script>

<script setup>
import { NButton, NAvatar, NPopover } from 'naive-ui';
import SearchBar from '@/components/SearchBar.vue';
import api from '@/api/index.js';
import { onMounted } from 'vue';
import { useMapState, useMapMutations, useRouterMethods } from '@/composables';
import http from '../../api/http';

const { loginStatus, profile } = useMapState('user');
const { handleLogout, handleLogin, setCreatedPlayLists, setCollectedPlayLists } = useMapMutations('user');
const { toHome, toLogin } = useRouterMethods();

const logout = async () => {
  const status = await api.user.logout();
  if (status) {
    handleLogout();
  }
};

onMounted(async () => {
  const res = await api.user.getLoginStatus();
  if (res.loginStatus) {
    handleLogin(res.profile);

    {
      const playLists = await http.getUserPlayLists(profile.value.userId);
      setCollectedPlayLists(playLists.filter((item) => item.creator.id != profile.value.userId));
      setCreatedPlayLists(playLists.filter((item) => item.creator.id == profile.value.userId));
    }
  }
});
</script>

<style module>
.header {
  composes: flexVCenter from '@/styles/mixin.css';
  justify-content: space-between;
  position: absolute;
  z-index: 10;
  left: 0;
  top: 0;
  width: 100%;
  height: 50px;
  padding: 0 20px;
  background-color: hsla(0, 0%, 100%, 0.86);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.homeBtn {
  composes: flexVCenter from '@/styles/mixin.css';
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
}
.homeBtn > :last-child {
  margin-left: 6px;
}
.userInfo {
  composes: flexVCenter from '@/styles/mixin.css';
}
.userInfo > :first-child {
  margin-right: 6px;
}
.userName {
  composes: flexVCenter from '@/styles/mixin.css';
  cursor: pointer;
}
.userName > :first-child {
  margin-left: 6px;
}
.right {
  composes: flexVCenter from '@/styles/mixin.css';
}
.link {
  composes: flexVHCenter from '@/styles/mixin.css';
  margin-left: 15px;
}
</style>
