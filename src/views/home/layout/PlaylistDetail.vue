<template>
  <div :class="$style.playlistDetail">
    <n-scrollbar @scroll="handleScroll($event)">
      <div ref="container" :class="$style.wrap">
        <div :class="$style.header">
          <the-image class :src="detail.imgUrl" size="180" round="large" />
          <div :class="$style.info">
            <div :class="[$style.title, $style.layout]">
              <n-tag size="small">歌单</n-tag>
              <div class="text-lg">{{ detail.name }}</div>
            </div>
            <div :class="[$style.layout]">
              <the-image :src="detail.avatarUrl + '?param=26y26'" round="full" size="26" />
              <div>{{ detail.creatorName }}</div>
            </div>
            <div :class="[$style.layout]">
              <n-button>播放全部</n-button>
              <n-button @click="subscribe">收藏</n-button>
            </div>
            <div :class="[$style.layout]">
              <div>标签:</div>
              <div>
                <span v-for="tag in detail.tags">{{ tag }}</span>
              </div>
            </div>
            <div :class="$style.description">
              <div>简介:</div>
              <div>{{ detail.description }}</div>
            </div>
          </div>
        </div>
        <n-tabs default-value="playlist" type="line" :tabs-padding="20">
          <n-tab-pane name="playlist" tab="歌曲列表">
            <div>
              <song-table-list :songs="songs"></song-table-list>
              <div :class="$style.loading">
                <n-spin v-if="showSpin" />
                <span v-else class>没有更多了......</span>
              </div>
            </div>
          </n-tab-pane>
          <n-tab-pane name="comment" tab="评论">
            <div :class="$style.comment">
              <comment-item v-for="item in comments" :comment="item"></comment-item>
            </div>
          </n-tab-pane>
          <n-tab-pane name="subsciber" tab="收藏者">
            <div class>
              <n-result
                v-if="subscribers.length === 0"
                status="info"
                title="貌似，啥也没有！"
                description="生活总归带点荒谬"
                size="huge"
              ></n-result>
              <div v-else :class="$style.subscriberBox">
                <div
                  :class="$style.cardSubscriber"
                  v-for="(item, index) in subscribers"
                  :key="index"
                >
                  <the-image round="full" size="88" :src="item.avatarUrl + '?param=100y100'" />
                  <div :class="$style.subscriberInfo">
                    <div class="ellipsis">{{ item.nickname }}</div>
                    <div class="ellipsis">{{ item.signature }}</div>
                  </div>
                </div>
              </div>
            </div>
          </n-tab-pane>
        </n-tabs>
        <n-back-top v-if="container" :right="20" :bottom="100" :to="container"></n-back-top>
      </div>
    </n-scrollbar>
  </div>
</template>

<script setup>
import api from "@/api/index.js"
import Playlist from "../../../model/Playlist";
import Song from "../../../model/Song";
import _ from 'lodash'
import { ref, onMounted, onUnmounted } from "vue";
import {
  NTag,
  NSpin,
  NTabs,
  NTabPane,
  NResult,
  NButton,
  NScrollbar,
} from "naive-ui";
import SongTableList from "@/components/SongTableList.vue";
import CommentItem from "../../../components/CommentItem.vue";

const props = defineProps({
  id: String,
});

const container = ref(null)

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
      console.log(res)
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

const subscribe = () => {
  let t = detail.value.subscribed ? 2 : 1
  api.playlist.subscribe(t, props.id).then(
    res => {
      console.log(res)
    }
  )
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

<style module>
.playlistDetail {
  width: 100%;
  height: 100%;
}
.wrap {
  position: relative;
  display: flex;
  flex-direction: column;
  row-gap: var(--gap-lg);
}
.header {
  display: flex;
  padding: 2rem 2rem 0 2rem;
  column-gap: var(--gap-lg);
}
.info {
  display: flex;
  flex-direction: column;
  row-gap: var(--gap-sm);
}
.layout {
  display: flex;
  align-items: center;
  column-gap: var(--gap-sm);
}
.description {
  display: flex;
  column-gap: var(--gap-sm);
}
.loading {
  display: flex;
  justify-content: center;
  margin: 2rem 0;
}

.comment {
  display: flex;
  flex-direction: column;
  row-gap: var(--gap-lg);
  padding: 0 4rem;
}
.subscriberBox {
  display: grid;
  row-gap: var(--gap-lg);
  column-gap: var(--gap-lg);
  padding: 2rem;
}
@media screen and (min-width: 900px) {
  .subscriberBox {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media screen and (min-width: 1200px) {
  .subscriberBox {
    grid-template-columns: repeat(4, 1fr);
  }
}
.cardSubscriber {
  display: flex;
  column-gap: var(--gap-sm);
  align-items: center;
}
.subscriberInfo {
  width: 0;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  row-gap: var(--gap-sm);
}
</style>