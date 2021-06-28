<template>
  <div class="menu">
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

    <sub-menu :label="personalPlaylistsOption.label"></sub-menu>
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
</template>

<script>
import { fetchFavoredPlaylists } from "api/methods.js";

import { ref } from "vue";

import MenuItem from "components/MenuItem.vue";
import MenuItemGroup from "components/MenuItemGroup.vue";
import SubMenu from "components/SubMenu.vue";

import Playlist from "model/Playlist.js";

const staticMenuOption = [
  {
    path: "/",
    label: "发现音乐",
    key: "discovery",
  },
  {
    path: "/video",
    label: "视频",
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

const personalPlaylistsOption = ref({
  label: "创建的歌单",
  key: "personal-playlists",
  iconName: "logo",
  children: [],
});

const favoredPlaylists = ref([]);
const favoredPlaylistsOption = ref({
  label: "收藏的歌单",
  key: "favored-playlists",
  children: favoredPlaylists,
});

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
    return {
      staticMenuOption,
      staticPersonalMenuOption,
      personalPlaylistsOption,
      favoredPlaylistsOption,
      favoredPlaylists,
    };
  },
  created() {
    // this.$watch(
    //   () => this.$store.state.accountId,
    //   this.getFavoredPlaylists
    // )
    this.getFavoredPlaylists();
  },
  watch: {
    "$store.state.accountId": "getFavoredPlaylists",
  },
  methods: {
    toPlaylistDetail(id) {
      this.$router.push(`/playlist-detail/${id}`);
    },
    async getFavoredPlaylists() {
      if (this.$store.state.accountId) {
        let res = await fetchFavoredPlaylists(this.$store.state.accountId);
        res.playlist.forEach((item) => {
          const playlist = new Playlist(item);
          favoredPlaylists.value.push(this.CreateMenuOption(playlist));
        });
      }
    },
    CreateMenuOption(playlist) {
      return {
        label: playlist.name,
        key: "/playlist-detail/" + playlist.id,
        iconName: "playlist",
      };
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
