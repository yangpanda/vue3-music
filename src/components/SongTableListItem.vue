<template>
  <div class="list-item" @dblclick="play(index)">
    <div class="front">
      <span class="w-8 text-right">{{ formatIndex(index + 1) }}</span>
      <div class="flex items-center" style="cursor: pointer">
        <svg-icon v-if="!isLiked(song.id)" name="love" size="20" color="#909399" />
        <svg-icon v-else name="love-selected" size="20" color="#ec4141" />
      </div>
    </div>
    <div class="ellipsis">{{ song.name }}</div>
    <div class="ellipsis space-x-3">
      <a
        class="ellipsis cursor-pointer text-gray-500 hover:text-black"
        v-for="(artist, index) in song.singer"
        :key="index"
        @click="router.push(`/artist-detail/${artist.id}`)"
      >{{ artist.name }}</a>
    </div>
    <div
      class="ellipsis cursor-pointer text-gray-500 hover:text-black"
      @click="router.push(`/album-detail/${song.album.id}`)"
    >{{ song.album.name }}</div>
    <div class="text-gray-500">{{ song.duration }}</div>
  </div>
</template>

<script>
import * as utils from "@/utils/index.js";
import { mapMutations } from '@/lib/lib.js';
import { useRouter } from 'vue-router'

export default {
  name: "SongTableListItem",
  props: {
    song: {
      type: Object,
    },
    index: {
      type: Number,
    },
    inLove: false,
  },
  emits: ['play'],
  setup(props, { emit }) {
    const { setCurrentSong, setPlayIndex, setPlayingState } = mapMutations()
    const router = useRouter()

    const play = () => {
      setCurrentSong(props.song)
      setPlayIndex(props.index)
      setPlayingState(true)
      emit('play')
    }
    return {
      play,
      router,
    }
  },
  methods: {
    formatIndex(num) {
      return utils.formatNumber(num);
    },
    isLiked(id) {
      const likedSongs = this.$store.state.likedSongs
      return likedSongs
        ? likedSongs.has(id)
        : false;
    },
  },
};
</script>

<style lang="postcss" scoped>
.list-item {
  @apply h-10 grid items-center gap-x-5 px-5;
  @apply cursor-default odd:bg-gray-100 hover:bg-gray-200;
  grid-template-columns: 80px 3fr 2fr 2fr 60px;
}

.front {
  @apply flex items-center justify-between;
}
</style>
