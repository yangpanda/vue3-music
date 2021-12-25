<template>
  <div :class="$style.albumDetail">
    <the-scrollbar>
      <div :class="$style.albumDetailHeader">
        <div :class="$style.albumCover">
          <the-image :src="album.picUrl" size="180" round="large" />
        </div>
        <n-space vertical>
          <div :class="$style.albumTitle">
            <n-tag size="small">专辑</n-tag>
            <h2 style="margin: 0">{{ album.name }}</h2>
          </div>
          <n-button>播放全部</n-button>
          <div>
            歌手:
            <the-link
              :class="$style.artistLink"
              v-for="artist in album.artists"
              :params="{ name: 'ArtistDetail', id: artist.id }"
              >{{ artist.name }}</the-link
            >
          </div>
          <div>时间: {{ album.publishTime }}</div>
        </n-space>
      </div>
      <n-tabs default-value="album" type="line" :tabs-padding="20" :pane-style="{ 'padding-bottom': '20px' }">
        <n-tab-pane name="album" tab="歌曲列表">
          <div v-if="loading" style="display: flex; justify-content: center">
            <n-spin />
          </div>
          <song-table-list v-else :songs="songs"></song-table-list>
        </n-tab-pane>
        <n-tab-pane name="comment" tab="评论">
          <the-comment :id="album.id"></the-comment>
        </n-tab-pane>
        <n-tab-pane name="description" tab="专辑详情">
          <div :class="$style.albumDescription">
            <h3>专辑介绍</h3>
            <p :class="$style.des" v-for="des in album.description">{{ des }}</p>
          </div>
        </n-tab-pane>
      </n-tabs>
    </the-scrollbar>
  </div>
</template>

<script>
import api from '@/api/index.js';
import Song from '@/model/Song';
import Album from '@/model/Album.js';
import { ref, onMounted, reactive, toRefs } from 'vue';
import { NTag, NButton, NSpace, NSpin, NTabs, NTabPane } from 'naive-ui';
import SongTableList from '@/components/SongTableList.vue';
import TheComment from './TheComment.vue';

export default {
  name: 'AlbumDetail',
  props: {
    id: String | Number,
  },
  components: {
    NTag,
    NButton,
    NSpace,
    NSpin,
    NTabs,
    NTabPane,
    TheComment,
    SongTableList,
  },
  setup({ id }) {
    const loading = ref(true);
    const state = reactive({
      album: {},
      songs: [],
    });

    const getAlbumDetail = async () => {
      const res = await api.album.getAlbumDetail(id);
      if (res.code === 200) {
        state.album = new Album(res.album);
        state.songs = res.songs.map((item) => new Song(item));
        loading.value = false;
      }
    };

    onMounted(() => {
      getAlbumDetail();
    });

    return {
      ...toRefs(state),
      loading,
    };
  },
};
</script>

<style module>
.albumDetail {
  height: 100%;
}
.albumDetailHeader {
  display: flex;
  column-gap: 20px;
  padding: 20px;
}
.albumTitle {
  display: flex;
  align-items: center;
  column-gap: 10px;
}
.artistLink:not(:first-child)::before {
  content: '';
  border-left: 1px solid rgba(0, 0, 0, 0.2);
  margin: 0 10px;
}
.albumDescription {
  display: flex;
  flex-direction: column;
  padding: 0 20px;
}
.des {
  margin: 0;
  text-indent: 2em;
  line-height: 2em;
  word-break: break-all;
}
</style>
