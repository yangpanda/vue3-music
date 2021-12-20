<template>
  <n-scrollbar>
    <div>
      <menu-item
        v-for="(item, index) in staticMenuOption"
        :key="index"
        :label="item.label"
        :iconName="item.icon"
        @click="$router.push(item.path)"
      />
      <menu-group :label="staticPersonalMenuOption.label">
        <menu-item
          v-for="(item, index) in staticPersonalMenuOption.children"
          :key="index"
          :label="item.label"
          :iconName="item.iconName"
          @click="$router.push(item.path)"
        />
      </menu-group>
      <sub-menu :label="personalPlaylistsOption.label">
        <menu-item
          v-for="(item, index) in personalPlaylistsOption.children"
          :key="index"
          :label="item.label"
          iconName="love"
          @click="$router.push(item.key)"
        />
      </sub-menu>
      <sub-menu :label="favoredPlaylistsOption.label">
        <menu-item
          v-for="(item, index) in favoredPlaylistsOption.children"
          :key="index"
          :label="item.label"
          :iconName="item.iconName"
          @click="$router.push(item.key)"
        />
      </sub-menu>
    </div>
  </n-scrollbar>
</template>

<script setup>
import MenuItem from '@/components/menu/MenuItem.vue';
import MenuGroup from '@/components/menu/MenuGroup.vue';
import SubMenu from '@/components/menu/SubMenu.vue';
import { NScrollbar } from 'naive-ui';

import { ref, computed, watchEffect, nextTick } from 'vue';
import { mapState, mapMutations } from '@/lib/lib.js';
import api from '@/api/index.js';
import Playlist from '@/model/Playlist.js';

const { userinfo, userPlaylists, logined } = mapState();
const { setUserPlaylists } = mapMutations();

const staticMenuOption = [
  {
    path: '/',
    label: '发现音乐',
    key: 'discovery',
  },
  {
    path: '/mv',
    label: 'MV',
    key: 'video',
  },
  {
    path: '/fm',
    label: '私人FM',
    key: 'fm',
  },
];

const staticPersonalMenuOption = {
  label: '我的音乐',
  type: 'group',
  key: 'personal',
  children: [
    {
      path: '/history',
      label: '最近播放',
      key: 'history',
      iconName: 'history',
    },
    {
      path: '/subscription',
      label: '我的收藏',
      key: 'subscription',
      iconName: 'collections',
    },
  ],
};

function CreateMenuOption(playlist) {
  return {
    label: playlist.name,
    key: '/playlist-detail/' + playlist.id,
    iconName: 'playlist',
  };
}

const createdPlaylists = computed(() => {
  if (userPlaylists.value) {
    const arr = userPlaylists.value.filter((item) => item.creator.userId === userinfo.value.id);
    return arr.map((item) => CreateMenuOption(item));
  } else {
    return [];
  }
});
const personalPlaylistsOption = ref({
  label: '创建的歌单',
  key: 'personal-playlists',
  iconName: 'logo',
  children: createdPlaylists,
});

const favoredPlaylists = computed(() => {
  if (userPlaylists.value) {
    const arr = userPlaylists.value.filter((item) => item.creator.userId != userinfo.value.id);
    return arr.map((item) => CreateMenuOption(item));
  } else {
    return [];
  }
});
const favoredPlaylistsOption = ref({
  label: '收藏的歌单',
  key: 'favored-playlists',
  children: favoredPlaylists,
});

const getUserPlaylists = () => {
  api.playlist.getUserPlaylists(userinfo.value.id).then((response) => {
    if (response.code === 200) {
      setUserPlaylists(response.playlist.map((item) => new Playlist(item)));
    }
  });
};

watchEffect(() => {
  if (logined.value) {
    getUserPlaylists();
  } else {
    setUserPlaylists(null);
  }
});
</script>

<style module></style>
