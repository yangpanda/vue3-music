<template>
  <div class="card-wrapper">
    <div class="relative">
      <the-image :src="song.al.picUrl + '?param=50y50'" size="50" round="normal" />
      <svg-button
        class="play-btn"
        name="play-triangle"
        color="#ec4141"
        box
        :triangle="true"
        @click="play(song)"
      />
    </div>
    <div class="info-wrapper">
      <div class="title">{{ song.name }}</div>
      <div class="artist-wrapper">
        <a class="artist" v-for="artist in song.ar" @click="toArtistDetail(artist.id)">{{ artist.name }}</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { mapMutations } from '@/lib/lib.js';
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps({
  song: Object,
});

const { setCurrentSong, insertSong } = mapMutations();

function play(song) {
  setCurrentSong(song);
  insertSong(song);
}

function toArtistDetail(id) {
  router.push(`/artist-detail/${id}`);
}
</script>

<style scoped lang="postcss">
.card-wrapper {
  @apply flex items-center gap-x-3;
  @apply rounded cursor-default p-1;
  @apply hover:bg-gray-100;
}
.play-btn {
  @apply absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2;
}
.info-wrapper {
  @apply flex flex-col flex-grow;
  @apply w-0 space-y-1;
}

.title {
  @apply overflow-ellipsis overflow-hidden whitespace-nowrap;
}

.artist-wrapper {
  @apply overflow-hidden overflow-ellipsis whitespace-nowrap;
  @apply text-xs text-gray-400 space-x-1.5;
}
.artist {
  @apply hover:text-gray-500 cursor-pointer;
}
</style>
