<template>
  <div :class="$style.container">
    <div :class="$style.nav">
      <div :class="$style.left">
        <span
          :class="state.type === value ? $style.active : ''"
          v-for="(value, name) in Object.fromEntries(typeMap)"
          @click="state.type = value"
        >
          {{ name }}
        </span>
      </div>
      <n-button @click="() => playTheList(state.songs)">播放全部</n-button>
    </div>
    <div>
      <div :class="$style.songItem" v-for="(item, index) in state.songs" :key="item.id">
        <div :class="[$style.Index]">{{ index + 1 }}</div>
        <div :class="[$style.coverBox, 'cursor-pointer']">
          <the-image :src="item.album.picUrl" size="60" radius="6" />
          <bg-play :class="$style.btn" @click="playSingleSong(item)"></bg-play>
        </div>
        <div class="ellipsis">{{ item.name }}</div>
        <div class="ellipsis">
          <the-link
            :class="$style.artistLink"
            v-for="artist in item.artists"
            :to="{ name: 'ArtistDetail', params: { id: artist.id } }"
            >{{ artist.name }}</the-link
          >
        </div>
        <div class="ellipsis">
          <the-link :to="{ name: 'AlbumDetail', params: { id: item.album.id } }">{{
            item.album.name
          }}</the-link>
        </div>
        <div :class="$style.duration">{{ item.duration }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopSong',
};
</script>

<script setup>
import { onMounted, watch, reactive } from 'vue';
import api from '@/api/index.js';
import Song from '@/model/Song.js';
import { useStore } from 'vuex';
import BgPlay from '@/components/button/BgPlay.vue';
import { NButton } from 'naive-ui';

const typeMap = new Map([
  ['全部', 0],
  ['华语', 7],
  ['欧美', 96],
  ['日本', 8],
  ['韩国', 16],
]);

const state = reactive({
  type: 0,
  songs: [],
});

const store = useStore();
const playSingleSong = (song) => store.commit('player/playSingleSong', song);
const playTheList = (list) => store.commit('player/playTheList', list);

const getTopSong = async () => {
  const res = await api.song.getTopSong({
    type: state.type,
  });
  if (res.code === 200) {
    state.songs = res.data.map((item) => new Song(item));
  }
};

onMounted(() => getTopSong());

watch(
  () => state.type,
  () => getTopSong(),
);
</script>

<style module>
.container {
  width: 100%;
}
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.left > * {
  cursor: pointer;
}
.left > *:hover {
  color: #18a058;
}
.left > *.active {
  color: #18a058;
}
.left > :not(:first-child)::before {
  content: '';
  height: 0.8em;
  border: 1px solid rgba(0, 0, 0, 0.1);
  margin: 0 10px;
}
.songItem {
  display: grid;
  grid-template-columns: 30px 60px 1.2fr 2fr 1fr 40px;
  column-gap: 15px;
  padding: 10px 10px 10px 5px;
  align-items: center;
  justify-content: space-between;
}
.songItem:nth-of-type(odd) {
  background-color: #f9f9f9;
}
.Index {
  text-align: end;
}
.coverBox {
  position: relative;
  flex-shrink: 0;
}
.btn {
  position: absolute !important;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.duration {
  text-align: end;
}
.artistLink:not(:first-child)::before {
  content: '';
  border: 1px solid rgba(0, 0, 0, 0.2);
  margin: 0 10px;
}
</style>
