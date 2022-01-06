<template>
  <div :class="$style.header">
    <div :class="$style.homeBtn" @click="toHome">
      <svg width="32" height="32">
        <use xlink:href="#icon-logo" />
      </svg>
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
              <svg-icon name="arrow-down" size="14" />
            </div>
          </template>
          <div class="dropdown">
            <n-button block @click="logout">退出登录</n-button>
          </div>
        </n-popover>
      </div>
      <a :class="$style.link" href="https://github.com/yangpanda/vue3-pc-netease-music" target="_blank">
        <svg-icon name="github" size="32"></svg-icon>
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
import { useStore } from 'vuex';
import useRouterMethods from '@/composables/useRouterMethods.js';
import { computed, onMounted } from 'vue';
import Playlist from '@/model/Playlist.js';

const store = useStore();
const loginStatus = computed(() => store.state.user.loginStatus);
const profile = computed(() => store.state.user.profile);
const handleLogout = () => store.commit('user/HANDLE_LOGOUT');
const handleLogin = (payload) => store.commit('user/HANDLE_LOGIN', payload);
const setCreatedPlaylists = (playlists) => store.commit('user/SET_CREATED_PLAYLISTS', playlists);
const setCollectedPlaylists = (playlists) => store.commit('user/SET_COLLECTED_PLAYLISTS', playlists);

const { toHome, toLogin } = useRouterMethods();

const logout = async () => {
  const status = await api.user.logout();
  console.log(status);
  if (status) {
    handleLogout();
  }
};

onMounted(async () => {
  const res = await api.user.getLoginStatus();
  if (res.loginStatus) {
    handleLogin(res.profile);

    {
      const res = await api.playlist.getUserPlaylists(profile.value.userId);
      const playlists = res.playlist.map((item) => new Playlist(item));
      setCollectedPlaylists(playlists.filter((item) => item.creator.userId != profile.value.userId));
      setCreatedPlaylists(playlists.filter((item) => item.creator.userId === profile.value.userId));
    }
  }
});
</script>

<style module>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 0 20px;
  background-color: #f5f5f5;
}
.homeBtn {
  display: flex;
  align-items: center;
  font-size: 18px;
  cursor: pointer;
}
.homeBtn > :last-child {
  margin-left: 6px;
}
.userInfo {
  display: flex;
  align-items: center;
}
.userInfo > :first-child {
  margin-right: 6px;
}
.userName {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.userName > :first-child {
  margin-left: 6px;
}
.right {
  display: flex;
  align-items: center;
}
.link {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 15px;
}
</style>
