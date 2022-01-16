<template>
  <div :class="$style.container" v-infinite-scroll="loadMore" infinite-scroll-distance="10">
    <div :class="$style.albumItem">
      <div :class="$style.top50">
        <span>TOP</span>
        <span>50</span>
      </div>
      <song-list title="热门50首" :songs="state.hotSongs"></song-list>
    </div>
    <div :class="$style.albumItem" v-for="item in state.albums">
      <the-image :src="item.picUrl + '?param=180y180'" size="180" round="normal" />
      <song-list :title="item.name" :albumId="item.id"></song-list>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AlbumList',
};
</script>

<script setup>
import api from '@/api/index.js';
import { onMounted, reactive, ref } from 'vue';
import Song from '@/model/Song';
import SongList from './SongList.vue';

const props = defineProps({
  id: [Number, String],
});

const state = reactive({
  albums: [],
  hotSongs: [],
});

const limit = ref(10);
const hasMore = ref(false);
const offset = ref(0);

const getAlbums = async () => {
  const res = await api.artist.getAlbum({
    id: props.id,
    limit: limit.value,
    offset: offset.value * limit.value,
  });
  if (res.code === 200) {
    state.albums.push(...res.hotAlbums);
    hasMore.value = res.more;
    offset.value++;
  }
  console.log(res);
};

const loadMore = async () => {
  if (hasMore.value) {
    getAlbums();
  }
};

const getBrief = async () => {
  const res = await api.artist.getBrief(props.id);
  if (res.code === 200) {
    state.hotSongs = res.hotSongs.map((item) => new Song(item));
  }
  console.log(res);
};

onMounted(() => {
  getAlbums();
  getBrief();
});
</script>

<style module>
.container > :not(:last-child) {
  margin-bottom: 20px;
}
.albumItem {
  display: grid;
  grid-template-columns: 260px 1fr;
}
.top50 {
  width: 180px;
  height: 180px;
  background-image: linear-gradient(-20deg, #616161 0%, #9bc5c3 100%);
  border-radius: 6px;
  box-shadow: 0 2px 27px 6px rgba(0, 0, 0, 0.12);
  color: white;
  font-size: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  line-height: 1em;
  cursor: default;
}
</style>
