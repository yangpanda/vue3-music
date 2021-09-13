<template>
  <n-scrollbar>
    <div class="py-2">
      <menu-item
        v-for="(item, index) in staticMenuOption"
        :key="index"
        :label="item.label"
        :iconName="item.icon"
        @click="$router.push(item.path)"
      />
      <menu-item-group :label="staticPersonalMenuOption.label">
        <menu-item
          v-for="(item, index) in staticPersonalMenuOption.children"
          :key="index"
          :label="item.label"
          :iconName="item.iconName"
          @click="$router.push(item.path)"
        />
      </menu-item-group>
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
import MenuItem from "@/components/MenuItem.vue";
import MenuItemGroup from "@/components/MenuItemGroup.vue";
import SubMenu from "@/components/SubMenu.vue";
import { NScrollbar } from "naive-ui"

import { ref, computed } from "vue";
import { mapState } from "@/lib/lib.js";

const { userinfo, userPlaylists } = mapState()

const staticMenuOption = [{
  path: "/",
  label: "发现音乐",
  key: "discovery",
},
{
  path: "/mv",
  label: "MV",
  key: "video",
},
{
  path: "/friend",
  label: "朋友",
  key: "friend",
},
{
  path: "/fm",
  label: "私人FM",
  key: "fm",
},
];

const staticPersonalMenuOption = {
  label: "我的音乐",
  type: "group",
  key: "personal",
  children: [{
    path: "/history",
    label: "最近播放",
    key: "history",
    iconName: "history",
  },
  {
    path: "/radio",
    label: "我的电台",
    key: "history",
    iconName: "radio",
  },
  {
    path: "/collections",
    label: "我的收藏",
    key: "collection",
    iconName: "collections",
  },
  ],
};

function CreateMenuOption(playlist) {
  return {
    label: playlist.name,
    key: "/playlist-detail/" + playlist.id,
    iconName: "playlist",
  };
}

const createdPlaylists = computed(() => {
  if (userPlaylists.value != null) {
    const arr = userPlaylists.value.filter(item => item.creator.userId === userinfo.value.id)
    return arr.map(item => CreateMenuOption(item))
  } else {
    return []
  }
})
const personalPlaylistsOption = ref({
  label: "创建的歌单",
  key: "personal-playlists",
  iconName: "logo",
  children: createdPlaylists,
});

const favoredPlaylists = computed(() => {
  if (userPlaylists.value) {
    const arr = userPlaylists.value.filter(item => item.creator.userId != userinfo.value.id)
    return arr.map(item => CreateMenuOption(item))
  } else {
    return []
  }
})
const favoredPlaylistsOption = ref({
  label: "收藏的歌单",
  key: "favored-playlists",
  children: favoredPlaylists,
});
</script>

<style scoped>
</style>
