<template>
  <n-scrollbar @scroll="handleScroll($event)">
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
          <div>
            <song-table-list :songs="songs"></song-table-list>
            <div class="flex justify-center my-5">
              <n-spin v-if="showSpin" />
              <div v-else class="text-center">没有更多了......</div>
            </div>
          </div>
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
                  <div
                    class="overflow-hidden overflow-ellipsis whitespace-nowrap"
                  >{{ item.nickname }}</div>
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
  </n-scrollbar>
</template>

<script setup>
import api from "@/api/index.js"
import Playlist from "../model/Playlist";
import Song from "../model/Song";
import _ from 'lodash'
import { ref, onMounted, onUnmounted } from "vue";
import {
  NSpin,
  NTabs,
  NTabPane,
  NResult,
  NScrollbar,
} from "naive-ui";
import SongTableList from "@/components/SongTableList.vue";
import Tag from "@/components/Common/Tag.vue"
import TheButton from "@/components/Common/Button/TheButton.vue"
import Comment from "../components/Comment.vue";

const props = defineProps({
  id: String,
});

// data refs
const detail = ref({});
const songs = ref([]);
const songIdChunks = ref([])
const comments = ref([])
const subscribers = ref([]);

const getSongs = async (ids) => {
  api.song.getSongDetail(ids)
    .then(response => {
      if (response.code === 200) {
        songs.value.push(...response.songs.map(item => new Song(item)))
      }
    })
};

const getPlaylistDetail = async (id) => {
  api.playlist.getPlaylistDetail(id).then((res) => {
    if (res.code === 200) {
      detail.value = new Playlist(res.playlist);
      subscribers.value = res.playlist.subscribers;
      const ids = detail.value.trackIds.map((item) => item.id);
      songIdChunks.value = _.chunk(ids, pageSize)
      getSongs(songIdChunks.value[0].join(','))
    }
  });
};

const getComment = async (id) => {
  api.comment.ofPlaylist({
    id
  }).then(response => {
    if (response.code === 200) {
      comments.value = response.comments
    }
  })
}


let counter = 1
const distance = 40;
const pageSize = 100
const showSpin = ref(true)

const handleScroll = _.throttle(function (event) {
  const scrollbar = event.target
  const scrollHeight = () => scrollbar.scrollHeight
  const scrollTop = () => scrollbar.scrollTop
  const clientHeight = () => scrollbar.clientHeight

  if ((scrollTop() + clientHeight()) >= (scrollHeight() - distance)) {
    console.log('loadmore')
    if (counter < songIdChunks.value.length) {
      getSongs(songIdChunks.value[counter].join(','))
      counter += 1
    } else {
      showSpin.value = false
    }
  }
}, 500, { leading: false })

onMounted(() => {
  getPlaylistDetail(props.id)
  getComment(props.id)
});

onUnmounted(() => {
  handleScroll.cancel()
})
</script>