<template>
  <scroll-bar>
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
  </scroll-bar>
</template>

<script>
import * as playlist from "@/api/service/playlist.js";

import { ref, watch, computed } from "vue";
import { mapState } from "@/lib/lib.js";

import MenuItem from "@/components/MenuItem.vue";
import MenuItemGroup from "@/components/MenuItemGroup.vue";
import SubMenu from "@/components/SubMenu.vue";

import Playlist from "@/model/Playlist.js";

export default {
  name: "Sidebar",
  components: {
    MenuItem,
    MenuItemGroup,
    SubMenu,
  },
  data() {
    return {
      menuOption: [],
    };
  },
  setup() {
    const staticMenuOption = [
      {
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
      children: [
        {
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

    const createdPlaylists = ref([]);
    const personalPlaylistsOption = ref({
      label: "创建的歌单",
      key: "personal-playlists",
      iconName: "logo",
      children: createdPlaylists,
    });

    const favoredPlaylists = ref([]);
    const favoredPlaylistsOption = ref({
      label: "收藏的歌单",
      key: "favored-playlists",
      children: favoredPlaylists,
    });

    const { logined, userinfo } = mapState()

    function CreateMenuOption(playlist) {
      return {
        label: playlist.name,
        key: "/playlist-detail/" + playlist.id,
        iconName: "playlist",
      };
    }

    const getUserPlaylists = async () => {
      console.log('dkdflajlf')
      if (userinfo.value) {
        let res = await playlist.getUserPlaylists(userinfo.value.id);
        res.playlist.forEach((item) => {
          const playlist = new Playlist(item);
          if (item.userId == userinfo.value.id) {
            createdPlaylists.value.push(CreateMenuOption(playlist));
          } else {
            favoredPlaylists.value.push(CreateMenuOption(playlist));
          }
        });
      }
    };

    watch(
      () => logined.value,
      () => {
        if (logined.value === true) {
          getUserPlaylists();
        } else {
          favoredPlaylists.value = []
          createdPlaylists.value = []
        }
      }
    );
    console.log(logined.value)

    return {
      staticMenuOption,
      staticPersonalMenuOption,
      personalPlaylistsOption,
      createdPlaylists,
      favoredPlaylistsOption,
      favoredPlaylists,
    };
  },
  methods: {
    toPlaylistDetail(id) {
      this.$router.push(`/playlist-detail/${id}`);
    },

  },
};
</script>

<style scoped>
</style>
