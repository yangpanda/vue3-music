<template>
  <div :class="$style.container" v-infinite-scroll="loadMore" infinite-scroll-distance="10">
    <div :class="$style.albumItem">
      <div :class="$style.top50">
        <span>TOP</span>
        <span>50</span>
      </div>
      <song-list title="热门50首" :songs="state.hotSongs"></song-list>
    </div>
    <div :class="$style.albumItem" v-for="album in state.albums" :key="album.id">
      <the-image :src="album.picUrl + '?param=180y180'" size="180" round="normal" />
      <song-list :title="album.name" :albumId="album.id"></song-list>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AlbumList',
};
</script>

<script setup>
import SongList from './SongList.vue';
import { onBeforeMount, reactive } from 'vue';
import http from '@/api/http';

const props = defineProps({
  id: '',
});

const state = reactive({
  albums: [],
  hotSongs: [],
  limit: 10,
  hasMore: false,
  offset: 0,
});

const getAlbums = async () => {
  const { more, albums } = await http.getArtistAlbums({
    id: props.id,
    limit: state.limit,
    offset: state.offset * state.limit,
  });
  state.albums.push(...albums);
  state.hasMore = more;
  state.offset++;
};

const loadMore = async () => {
  if (state.hasMore) {
    getAlbums();
  }
};

onBeforeMount(() => {
  getAlbums();
  http.getArtistHotSongs(props.id).then((res) => (state.hotSongs = res));
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
