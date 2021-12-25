<template>
  <div :class="$style.albumDetail">
    <n-scrollbar>
      <div :class="$style.albumDetailHeader">
        <div :class="$style.albumCover">
          <the-image :src="album.picUrl" size="180" round="large" />
        </div>
        <n-space vertical>
          <div :class="$style.albumTitle">
            <n-tag size="small">专辑</n-tag>
            <h2 style="margin: 0">{{ album.name }}</h2>
          </div>
          <n-space>
            <n-button>播放全部</n-button>
            <n-button>收藏</n-button>
          </n-space>
          <div>
            歌手:
            <the-link v-for="artist in album.artists" @click="toArtistDetail(artist.id)">{{
              artist.name
            }}</the-link>
          </div>
          <div>时间: {{ album.publishTime }}</div>
        </n-space>
      </div>
      <n-tabs default-value="album" type="line" :tabs-padding="20" :pane-style="{ 'padding-bottom': '20px' }">
        <n-tab-pane name="album" tab="歌曲列表">
          <div v-if="showSpin" style="display: flex; justify-content: center">
            <n-spin />
          </div>
          <song-table-list v-else :songs="songs"></song-table-list>
        </n-tab-pane>
        <n-tab-pane name="comment" tab="评论">
          <component :is="Comment" :id="album.id"></component>
        </n-tab-pane>
        <n-tab-pane name="description" tab="专辑详情">
          <div :class="$style.albumDescription">
            <h3>专辑介绍</h3>
            <p :class="$style.des" v-for="des in album.description">{{ des }}</p>
          </div>
        </n-tab-pane>
      </n-tabs>
    </n-scrollbar>
  </div>
</template>

<script setup>
import * as song from '@/api/service/song.js';
import * as albumApi from '@/api/service/album.js';

import Song from '@/model/Song';
import Album from '@/model/Album.js';
import { ref, onMounted, defineAsyncComponent } from 'vue';
import useRouterMethods from '@/composables/router-methods';

import SongTableList from '@/components/SongTableList.vue';
import { NTag, NButton, NSpace, NSpin, NTabs, NTabPane, NScrollbar } from 'naive-ui';
import TheLink from '@/components/TheLink.vue';

const Comment = defineAsyncComponent(() => import('./Comment.vue'));

const props = defineProps({
  id: String,
});

const { toArtistDetail } = useRouterMethods();

const showSpin = ref(true);
const album = ref({});
const songs = ref([]);

const getSongs = async (ids) => {
  song.getSongDetail(ids.join(',')).then((res) => {
    if (res.code === 200) {
      songs.value = res.songs.map((item) => new Song(item));
      showSpin.value = false;
    }
  });
};

const getAlbumDetail = async (id) => {
  showSpin.value = true;
  albumApi.getAlbumDetail(id).then((res) => {
    if (res.code === 200) {
      album.value = new Album(res.album);

      let songsId = res.songs.map((item) => item.id);
      getSongs(songsId);
    }
  });
};

onMounted(getAlbumDetail(props.id));
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
.albumUser {
  display: flex;
  align-items: center;
  column-gap: 10px;
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
