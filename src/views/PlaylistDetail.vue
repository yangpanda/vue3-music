<template>
  <div class="space-y-5">
    <div class="flex gap-x-5 p-5">
      <the-image class :src="detail.imgUrl" size="180" round="large" />
      <div class="flex flex-col gap-y-3">
        <div class="flex items-center gap-x-2">
          <tag>歌单</tag>
          <div class="text-xl font-semibold">{{ detail.name }}</div>
        </div>
        <div class="flex gap-x-2 items-center">
          <the-image :src="detail.avatarUrl + '?param=30y30'" round="full" size="30" />
          <div>{{ detail.creatorName }}</div>
        </div>
        <div class="space-x-3">
          <the-button>播放全部</the-button>
          <the-button>收藏</the-button>
        </div>
        <div class="flex gap-x-2 items-center">
          <div>标签:</div>
          <div>{{ detail.tags }}</div>
        </div>
        <div class="flex gap-x-2">
          <div class="whitespace-nowrap">简介:</div>
          <div>{{ detail.description }}</div>
        </div>
      </div>
    </div>
    <n-tabs default-value="playlist" type="line" :tabs-padding="20">
      <n-tab-pane name="playlist" tab="歌曲列表">
        <div v-if="showSpin" class="flex justify-center">
          <n-spin />
        </div>
        <song-table-list v-else :songs="songs"></song-table-list>
      </n-tab-pane>
      <n-tab-pane name="comment" tab="评论">
        <div class="px-5">
          <comment :comments="comments" />
        </div>
      </n-tab-pane>
      <n-tab-pane name="subsciber" tab="收藏者">
        <div class="p-5">
          <n-result
            v-if="subscribers.length === 0"
            status="info"
            title="貌似，啥也没有！"
            description="生活总归带点荒谬"
            size="huge"
          ></n-result>
          <div v-else class="grid md:grid-cols-2 xl:grid-cols-4 gap-y-4">
            <div
              class="flex gap-x-2 items-center"
              v-for="(item, index) in subscribers"
              :key="index"
            >
              <the-image round="full" size="88" :src="item.avatarUrl + '?param=100y100'" />
              <div class="flex flex-col w-0 flex-grow gap-y-2">
                <div class="overflow-hidden overflow-ellipsis whitespace-nowrap">{{ item.nickname }}</div>
                <div
                  class="overflow-hidden overflow-ellipsis whitespace-nowrap"
                >{{ item.signature }}</div>
              </div>
            </div>
          </div>
        </div>
      </n-tab-pane>
    </n-tabs>
  </div>
</template>

<script setup>
import api from "@/api/index.js"

import Playlist from "../model/Playlist";
import Song from "../model/Song";

import SongTableList from "@/components/SongTableList.vue";
import Tag from "@/components/Common/Tag.vue"
import TheButton from "@/components/Common/Button/TheButton.vue"
import {
  useLoadingBar,
  NSpin,
  NTabs,
  NTabPane,
  NResult,
} from "naive-ui";

import { ref, onMounted } from "@vue/runtime-core";
import Comment from "../components/Comment.vue";

const props = defineProps({
  id: String,
});

const loading = useLoadingBar();
const showSpin = ref(true);
const detail = ref({});
const songs = ref([]);
const subscribers = ref([]);
const comments = ref([])

const getSongs = async (ids) => {
  // console.log(ids.length)

  api.song.getSongDetail(ids.slice(0, 500).join(",")).then((res) => {
    if (res.code === 200) {
      // console.log(res)
      songs.value.push(...res.songs.map((item) => new Song(item)));
      loading.finish();
      showSpin.value = false;
    }
  });
};

const getPlaylistDetail = async (id) => {
  loading.start();
  showSpin.value = true;
  api.playlist.getPlaylistDetail(id).then((res) => {
    if (res.code === 200) {
      // console.log(res)
      detail.value = new Playlist(res.playlist);
      subscribers.value = res.playlist.subscribers;
      let ids = detail.value.trackIds.map((item) => item.id);
      getSongs(ids);
    }
  });
};

onMounted(() => {
  getPlaylistDetail(props.id)

  api.comment.ofPlaylist({
    id: props.id
  }).then(response => {
    if (response.code === 200) {
      comments.value = response.comments
    }
  })
});
</script>