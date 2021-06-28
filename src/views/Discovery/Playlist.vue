<template>
  <div class="playlist">
    <div class="playlist-wrapper">
      <card-playlist
        v-for="(item, index) in playlists.slice(
          pageNumber * (currentPageIndex - 1),
          pageNumber * currentPageIndex
        )"
        :key="index"
        :playlist="item"
      />
    </div>
    <el-pagination
      class="playlist-wrapper"
      background
      layout="prev, pager, next"
      page-size="20"
      :total="playlists.length"
      @current-change="currentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";

import { fetchAllPlaylist } from "api/methods";

import Playlist from "model/Playlist.js";

import CardPlaylist from "components/CardPlaylist.vue";

export default {
  name: "Playlist",
  components: {
    CardPlaylist,
  },
  data() {
    return {
      pageNumber: 20,
      currentPageIndex: 1,
    };
  },
  setup() {
    const playlists = ref([]);
    const loading = ref(Boolean);
    loading.value = true;

    const getAllPlaylist = async () => {
      const res = await fetchAllPlaylist();
      res.playlists.forEach((playlist) => {
        playlists.value.push(new Playlist(playlist));
      });
      setTimeout(() => {
        loading.value = false;
      }, 500);
    };

    onMounted(getAllPlaylist);

    return {
      playlists,
      loading,
    };
  },
  methods: {
    currentChange(current) {
      this.currentPageIndex = current;
    },
  },
};
</script>

<style lang="scss" scoped>
.playlist {
  .playlist-wrapper {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 10px 20px;
  }
}
</style>