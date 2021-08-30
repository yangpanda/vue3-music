<template>
  <div class="playlist-detail-container">
    <div class="playlist-detail-header">
      <div class="playlist-cover">
        <the-image :src="detail.imgUrl" width="180px" height="180px" />
      </div>
      <div class="playlist-info">
        <div class="playlist-title">
          <n-tag size="small">歌单</n-tag>
          <h2 style="margin: 0">{{ detail.name }}</h2>
        </div>
        <div class="playlist-user">
          <n-avatar :src="detail.avatarUrl" circle :size="26" />
          <span>{{ detail.creatorName }}</span>
        </div>
        <div class="playlist-tags">
          <span>标签： </span>
          <span>{{ detail.tags }}</span>
        </div>
        <div class="playlist-description">
          <span class="label" style="white-space: nowrap">简介： </span>
          <span>{{ detail.description }}</span>
        </div>
      </div>
    </div>
    <n-tabs default-value="playlist" type="line" :tabs-padding="20">
      <n-tab-pane name="playlist" tab="歌曲列表">
        <div v-if="showSpin" style="display: flex; justify-content: center">
          <n-spin />
        </div>
        <song-table-list v-else :songs="songs"></song-table-list>
      </n-tab-pane>
      <n-tab-pane name="comment" tab="评论">
      </n-tab-pane>
      <n-tab-pane name="subsciber" tab="收藏者">
        <div class="subscribers-list-container">
          <n-result
            v-if="subscribers.length === 0"
            status="info"
            title="貌似，啥也没有！"
            description="生活总归带点荒谬"
            size="huge"
          ></n-result>
          <n-grid v-else x-gap="20" y-gap="20" :cols="4">
            <n-grid-item
              class="avatar-item flex-align-center col-gap-10"
              v-for="(item, index) in subscribers"
              :key="index"
            >
              <n-avatar
                round
                :src="item.avatarUrl + '?param=100y100'"
                :size="88"
              />
              <div class="user-info">
                <div class="user-name">{{ item.nickname }}</div>
                <div class="user-signature">{{ item.signature }}</div>
              </div>
            </n-grid-item>
          </n-grid>
        </div>
      </n-tab-pane>
    </n-tabs>
  </div>
</template>

<script setup>
import * as playlist from "@/api/service/playlist.js";
import * as song from "@/api/service/song.js";

import Playlist from "../model/Playlist";
import Song from "../model/Song";

import SongTableList from "@/components/SongTableList.vue";
import {
  useLoadingBar,
  NSpin,
  NTabs,
  NTabPane,
  NAvatar,
  NGrid,
  NGridItem,
  NResult,
} from "naive-ui";

import { ref, onMounted } from "@vue/runtime-core";

const props = defineProps({
  id: String,
});

const loading = useLoadingBar();
const showSpin = ref(true);
const detail = ref({});
const songs = ref([]);
const subscribers = ref([]);

const getSongs = async (ids) => {
  song.getSongDetail(ids.join(",")).then((res) => {
    if (res.code === 200) {
      songs.value = res.songs.map((item) => new Song(item));
      loading.finish();
      showSpin.value = false;
    }
  });
};

const getPlaylistDetail = async (id) => {
  loading.start();
  showSpin.value = true;
  playlist.getPlaylistDetail(id).then((res) => {
    if (res.code === 200) {
      console.log(res);
      detail.value = new Playlist(res.playlist);
      subscribers.value = res.playlist.subscribers;
      let ids = detail.value.trackIds.map((item) => item.id);
      getSongs(ids);
    }
  });
};

onMounted(getPlaylistDetail(props.id));
</script>

<style scoped>
.playlist-detail-header {
  display: flex;
  column-gap: 20px;
  padding: 20px;
}
.playlist-info {
  display: flex;
  flex-direction: column;
  row-gap: 6px;
  min-width: 820px;
}
.playlist-title {
  display: flex;
  align-items: center;
  column-gap: 10px;
}
.playlist-user {
  display: flex;
  align-items: center;
  column-gap: 10px;
}
.playlist-tags {
  display: flex;
  align-items: center;
}
.playlist-description {
  display: flex;
}

.subscribers-list-container {
  padding: 0 20px;
}
</style>
