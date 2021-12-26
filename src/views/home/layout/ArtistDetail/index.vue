<template>
  <div :class="$style.artistDetail">
    <the-scrollbar>
      <div :class="$style.content">
        <div :class="$style.infoBox">
          <the-image size="180" :src="artist.cover + '?param=180y180'" round="large" />
          <div :class="$style.info">
            <div style="font-size: 24px">{{ artist.name }}</div>
            <div :class="$style.infoDetail">
              <span>单曲数: {{ artist.musicSize }}</span>
              <span>专辑数: {{ artist.albumSize }}</span>
              <span>MV数: {{ artist.mvSize }}</span>
            </div>
          </div>
        </div>
        <n-tabs type="line">
          <n-tab-pane name="album" tab="专辑">
            <album-list :id="id" />
          </n-tab-pane>
          <n-tab-pane name="mv" tab="MV">
            <mv-list :id="id"></mv-list>
          </n-tab-pane>
          <n-tab-pane name="description" tab="歌手详情">{{ artist.description }}</n-tab-pane>
          <n-tab-pane name="similar-artist" tab="相似歌手">
            <similar-artist :id="id"></similar-artist>
          </n-tab-pane>
        </n-tabs>
      </div>
    </the-scrollbar>
  </div>
</template>

<script>
import api from '@/api/index.js';
import { ref, onMounted } from 'vue';
import Artist from '@/model/Artist.js';
import { NTabs, NTabPane } from 'naive-ui';
import AlbumList from './AlbumList.vue';
import SimilarArtist from './SimilarArtist.vue';
import MvList from './MvList.vue';

export default {
  props: {
    id: [String, Number],
  },
  components: {
    NTabs,
    NTabPane,
    AlbumList,
    SimilarArtist,
    MvList,
  },
  setup({ id }) {
    const artist = ref(new Artist());

    const getArtistDetail = async () => {
      const res = await api.artist.getDetail(id);
      if (res.code === 200) {
        artist.value = new Artist(res.data.artist);
      }
    };

    onMounted(() => {
      getArtistDetail();
    });

    return {
      artist,
    };
  },
};
</script>

<style module>
.artistDetail {
  height: 100%;
}
.content {
  display: flex;
  flex-direction: column;
  row-gap: var(--gap-lg);
  padding: 2rem;
}
.infoBox {
  display: flex;
  column-gap: var(--gap-lg);
}
.info {
  display: flex;
  flex-direction: column;
  row-gap: var(--gap-sm);
}
.infoDetail {
  display: flex;
  column-gap: var(--gap-lg);
}
</style>
