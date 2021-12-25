<template>
  <div :class="$style.container">
    <n-scrollbar @scroll="handleScroll($event)">
      <div ref="container" :class="$style.wrap">
        <div :class="$style.header">
          <the-image class :src="playlist.imgUrl" size="180" round="large" />
          <div :class="$style.info">
            <div :class="[$style.title, $style.layout]">
              <n-tag size="small">歌单</n-tag>
              <div class="text-lg">{{ playlist.name }}</div>
            </div>
            <div :class="[$style.layout]">
              <the-image :src="playlist.avatarUrl" round="full" size="26" />
              <div>{{ playlist.creatorName }}</div>
            </div>
            <div :class="[$style.layout]">
              <n-button>播放全部</n-button>
            </div>
            <div :class="[$style.layout]">
              <div>标签:</div>
              <div>
                <span v-for="tag in playlist.tags">{{ tag }}</span>
              </div>
            </div>
            <div :class="$style.description">
              <div>简介:</div>
              <div>{{ playlist.description }}</div>
            </div>
          </div>
        </div>
        <n-tabs default-value="playlist" type="line" :tabs-padding="20">
          <n-tab-pane name="playlist" tab="歌曲列表">
            <song-table-list :songs="songs"></song-table-list>
            <div :class="$style.loading">
              <n-spin v-if="loading" />
              <span v-else>没有更多了......</span>
            </div>
          </n-tab-pane>
          <n-tab-pane name="comment" tab="评论" display-directive="show:lazy">
            <the-comment :id="id"></the-comment>
          </n-tab-pane>
          <n-tab-pane name="subsciber" tab="收藏者">
            <n-result
              v-if="subscribers.length === 0"
              status="info"
              title="貌似，啥也没有！"
              description="生活总归带点荒谬"
              size="huge"
            ></n-result>
            <div v-else :class="$style.subscriberBox">
              <div :class="$style.cardSubscriber" v-for="(item, index) in subscribers" :key="index">
                <the-image round="full" size="88" :src="picSizeUrl(item.avatarUrl, 100)" />
                <div :class="$style.subscriberInfo">
                  <div class="ellipsis">{{ item.nickname }}</div>
                  <div class="ellipsis">{{ item.signature }}</div>
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

<script>
import api from '@/api/index.js';
import Playlist from '@/model/Playlist';
import Song from '@/model/Song';
import { throttle, chunk } from 'lodash';
import { ref, reactive, watch, onMounted, onUnmounted, toRefs } from 'vue';
import { NTag, NSpin, NTabs, NTabPane, NResult, NButton, NScrollbar, NBackTop } from 'naive-ui';
import SongTableList from '@/components/SongTableList.vue';
import TheComment from './TheComments.vue';
import { picSizeUrl } from '@/utils/picture.js';

export default {
  name: 'PlaylistDetail',
  components: {
    NTag,
    NSpin,
    NTabs,
    NTabPane,
    NResult,
    NButton,
    NBackTop,
    NScrollbar,
    SongTableList,
    TheComment,
  },
  props: {
    id: Number | String,
  },
  setup({ id }) {
    const container = ref(null);
    const state = reactive({
      loadmore: 1,
      playlist: {},
      songs: [],
      songsIdChunks: [],
      loading: true,
      subscribers: [],
    });
    const chunkSize = 100;

    const getPlaylistDetail = async () => {
      const res = await api.playlist.getPlaylistDetail(id);

      if (res.code === 200) {
        state.playlist = new Playlist(res.playlist);
        state.subscribers = res.playlist.subscribers;
        const songsId = state.playlist.trackIds.map((item) => item.id);
        state.songsIdChunks = chunk(songsId, chunkSize);
      }
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

    onMounted(() => {
      getPlaylistDetail();
    });

    watch(
      () => state.songsIdChunks,
      () => getPlaylistSongs(state.songsIdChunks[0].join(',')),
    );

    // 1. 有一个兄弟歌单收藏了好几千首歌，太多，无法一下子获取，后端直接报错
    // 2. 为了更好的性能
    const handleScroll = (() => {
      const distance = 40;

      return throttle(
        function (event) {
          const scrollbar = event.target;
          const scrollHeight = () => scrollbar.scrollHeight;
          const scrollTop = () => scrollbar.scrollTop;
          const clientHeight = () => scrollbar.clientHeight;

          if (scrollTop() + clientHeight() >= scrollHeight() - distance) {
            if (state.loadmore < state.songsIdChunks.length) {
              getPlaylistSongs(state.songsIdChunks[state.loadmore].join(','));
              state.loadmore += 1;
            } else {
              showSpin.value = false;
            }
          }
        },
        500,
        { leading: false },
      );
    })();

    onUnmounted(() => {
      handleScroll.cancel();
    });

    return {
      container,
      handleScroll,
      picSizeUrl,
      ...toRefs(state),
    };
  },
};
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
