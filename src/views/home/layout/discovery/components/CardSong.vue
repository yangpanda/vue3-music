<template>
  <div :class="$style.container">
    <div :class="$style.cover">
      <the-image :src="song.al.picUrl + '?param=50y50'" size="50" round="normal" />
      <bg-play :class="$style.btn" @click="playSingleSong(new Song(song))"></bg-play>
    </div>
    <div :class="$style.info">
      <div class="ellipsis">{{ song.name }}</div>
      <div :class="[$style.artist, 'ellipsis']">
        <the-link v-for="artist in song.ar" :to="{ name: 'ArtistDetail', params: { id: artist.id } }">{{
          artist.name
        }}</the-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardSong',
};
</script>

<script setup>
import { useStore } from 'vuex';
import Song from '@/model/Song.js';
import BgPlay from '@/components/button/BgPlay.vue';

const props = defineProps({
  song: null,
});

const store = useStore();
const playSingleSong = (song) => store.commit('player/playSingleSong', song);
</script>

<style module>
.container {
  display: flex;
  align-items: center;
}
.cover {
  margin-right: 10px;
  position: relative;
  cursor: pointer;
}
.btn {
  position: absolute !important;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.info {
  width: 0;
  height: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.artist {
  font-size: 12px;
}
.artist > :not(:first-child)::before {
  content: '';
  border-left: 1px solid rgba(0, 0, 0, 0.1);
  margin: 0 10px;
}
</style>
