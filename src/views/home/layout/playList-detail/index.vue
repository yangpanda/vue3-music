<template>
  <div :class="$style.container">
    <the-scrollbar>
      <div :class="$style.wrap">
        <div :class="$style.header">
          <the-image class :src="state.playList.picUrl" size="180" radius="8" />
          <div :class="$style.info">
            <div :class="[$style.title, $style.layout]">
              <n-tag size="small">歌单</n-tag>
              <div>{{ state.playList.name }}</div>
            </div>
            <div :class="[$style.layout]">
              <the-image :src="state.playList.creator.avatarUrl" radius="full" size="26" />
              <div>{{ state.playList.creator.nickname }}</div>
            </div>
            <div :class="[$style.layout]">
              <n-button @click="() => playTheList(state.songs)">播放全部</n-button>
            </div>
            <div :class="[$style.layout]">
              <div>标签:</div>
              <div>
                <span v-for="tag in state.playList.tags">{{ tag }}</span>
              </div>
            </div>
            <div :class="$style.description">
              <div>简介:</div>
              <div>{{ state.playList.description }}</div>
            </div>
          </div>
        </div>
        <n-tabs default-value="playlist" type="line" :tabs-padding="20">
          <n-tab-pane name="playlist" tab="歌曲列表">
            <song-table-list
              v-infinite-scroll="loadMore"
              infinite-scroll-distance="10"
              infinite-scroll-disabled="state.busy"
              :songs="state.songs"
            ></song-table-list>
            <div :class="$style.loading">
              <n-spin v-if="state.loading" />
              <span v-else>没有更多了......</span>
            </div>
          </n-tab-pane>
          <n-tab-pane name="comment" tab="评论" display-directive="show:lazy">
            <the-comment :id="id"></the-comment>
          </n-tab-pane>
          <n-tab-pane name="subsciber" tab="收藏者">
            <n-result
              v-if="state.subscribers.length === 0"
              status="info"
              title="貌似，啥也没有！"
              description="生活总归带点荒谬"
              size="huge"
            ></n-result>
            <div v-else :class="$style.subscriberBox">
              <div :class="$style.cardSubscriber" v-for="item in state.subscribers" :key="item.id">
                <the-image radius="full" size="88" :src="item.avatarUrl" />
                <div :class="$style.subscriberInfo">
                  <div class="ellipsis">{{ item.nickname }}</div>
                  <div class="ellipsis">{{ item.signature }}</div>
                </div>
              </div>
            </div>
          </n-tab-pane>
        </n-tabs>
      </div>
    </the-scrollbar>
  </div>
</template>

<script>
export default {
  name: 'PlayListDetail',
};
</script>

<script setup>
import Song from '@/model/Song';
import PlayList from '@/model/PlayList';
import api from '@/api/index.js';
import { chunk } from 'lodash';
import { reactive, watch, onBeforeMount } from 'vue';
import { NTag, NSpin, NTabs, NTabPane, NResult, NButton } from 'naive-ui';
import SongTableList from '@/components/SongTableList.vue';
import TheComment from './TheComments.vue';
import { useMapMutations } from '@/composables';
import http from '@/api/http';

const props = defineProps({
  id: '',
});

const state = reactive({
  playList: new PlayList(),
  loading: true,
  loadmore: 1,
  songs: [],
  songsIdChunks: [],
  subscribers: [],
  busy: false,
});

const { playTheList } = useMapMutations('player');

const getPlaylistDetail = async () => {
  const playList = await http.getPlayListDetail(props.id);
  state.playList = playList;
  state.subscribers = playList.subscribers;
  state.songsIdChunks = chunk(playList.trackIds, 100);
};
const getPlaylistSongs = async (ids) => {
  const res = await api.song.getSongDetail(ids);
  if (res.code === 200) {
    state.songs.push(...res.songs.map((item) => new Song(item)));
    if (state.loadmore === state.songsIdChunks.length) {
      state.loading = false;
    }
  }
};
const loadMore = () => {
  if (state.loadmore < state.songsIdChunks.length) {
    state.busy = true;
    getPlaylistSongs(state.songsIdChunks[state.loadmore].join(','));
    state.loadmore += 1;
    state.busy = false;
  }
};

onBeforeMount(() => {
  getPlaylistDetail();
});

watch(
  () => state.songsIdChunks,
  () => {
    getPlaylistSongs(state.songsIdChunks[0].join(','));
  },
);
</script>

<style module>
.container {
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
  padding: 1rem 4rem;
}
.commentItem {
  padding: var(--gap-sm);
}
.commentItem:not(:last-child) {
  border-bottom: 1px solid rgba(1, 1, 1, 0.1);
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
