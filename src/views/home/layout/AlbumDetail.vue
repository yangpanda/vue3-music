<template>
  <div class="album-detail-container">
    <div class="album-detail-header">
      <div class="album-cover">
        <the-image :src="album.picUrl" size="180" round="large" />
      </div>
      <div class="album-info">
        <div class="album-title">
          <n-tag size="small">专辑</n-tag>
          <h2 style="margin: 0">{{ album.name }}</h2>
        </div>
      </div>
    </div>
    <n-tabs default-value="album" type="line" :tabs-padding="20">
      <n-tab-pane name="album" tab="歌曲列表">
        <div v-if="showSpin" style="display: flex; justify-content: center">
          <n-spin />
        </div>
        <song-table-list v-else :songs="songs"></song-table-list>
      </n-tab-pane>
      <n-tab-pane name="comment" tab="评论"> </n-tab-pane>
      <n-tab-pane name="description" tab="专辑详情">
        <div class="album-description">
          <div class="description">{{ album.description }}</div>
        </div>
      </n-tab-pane>
    </n-tabs>
  </div>
</template>

<script setup>
import * as song from "@/api/service/song.js";
import * as albumApi from "@/api/service/album.js";

import Song from "../../../model/Song";

import SongTableList from "@/components/SongTableList.vue";
import {
  useLoadingBar,
  NSpin,
  NTabs,
  NTabPane,
} from "naive-ui";

import { ref, onMounted } from "@vue/runtime-core";

const props = defineProps({
  id: String,
});

const loading = useLoadingBar();
const showSpin = ref(true);
const album = ref({});
const songs = ref([]);

const getSongs = async (ids) => {
  song.getSongDetail(ids.join(",")).then((res) => {
    if (res.code === 200) {
      songs.value = res.songs.map((item) => new Song(item));
      loading.finish();
      showSpin.value = false;
    }
  });
};

const getAlbumDetail = async (id) => {
  loading.start();
  showSpin.value = true;
  albumApi.getAlbumDetail(id).then((res) => {
    if (res.code === 200) {
      console.log(res);
      album.value = res.album;

      let songsId = res.songs.map((item) => item.id);

      getSongs(songsId);
    }
  });
};

onMounted(getAlbumDetail(props.id));
</script>

<style scoped>
.album-detail-header {
  display: flex;
  column-gap: 20px;
  padding: 20px;
}
.album-info {
  display: flex;
  flex-direction: column;
  row-gap: 6px;
  min-width: 820px;
}
.album-title {
  display: flex;
  align-items: center;
  column-gap: 10px;
}
.album-user {
  display: flex;
  align-items: center;
  column-gap: 10px;
}
.album-description {
  display: flex;
}
</style>
