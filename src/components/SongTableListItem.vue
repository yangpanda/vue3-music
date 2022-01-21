<template>
  <div class="container" :class="{ disable: song.copyright }" @dblclick="play(index)">
    <div class="front">
      <span class="index">{{ formatIndex(index + 1) }}</span>
      <div class="btn">
        <the-icon v-if="!isLiked(song.id)" name="love" size="20" color="#909399" />
        <the-icon v-else name="love-selected" size="20" color="#ec4141" />
      </div>
      <img class="gif" v-if="song.id == currentSong.id" :src="playingGif" />
    </div>
    <the-image :src="song.picUrl" size="48" radius="6"></the-image>
    <div class="title">{{ song.name }}</div>
    <div class="artists">
      <the-link
        v-for="artist in song.artists"
        :key="artist.id"
        :to="{ name: 'ArtistDetail', params: { id: artist.id } }"
        >{{ artist.name }}</the-link
      >
    </div>
    <the-link :to="{ name: 'AlbumDetail', params: { id: song.album.id } }">{{ song.album.name }}</the-link>
    <div>{{ song.duration }}</div>
  </div>
</template>

<script>
import * as utils from '@/utils/index.js';
import playingGif from '@/assets/pictures/playing.gif';
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'SongTableListItem',
  props: {
    song: {
      type: Object,
    },
    index: {
      type: Number,
    },
  },
  emits: ['play'],
  setup(props, { emit }) {
    const store = useStore();

    const currentSong = computed(() => store.getters['player/currentSong']);
    const setPlaying = (flag) => store.commit('player/setPlaying', flag);
    const setCurrentIndex = (index) => store.commit('player/setCurrentIndex', index);

    const play = () => {
      setCurrentIndex(props.index);
      setPlaying(true);
      emit('play');
    };
    return {
      currentSong,
      play,
      playingGif,
    };
  },
  methods: {
    formatIndex(num) {
      return utils.formatNumber(num);
    },
    isLiked(id) {
      const likedSongs = this.$store.state.likedSongs;
      return likedSongs ? likedSongs.has(id) : false;
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  cursor: default;
  height: 60px;
  padding: 0 20px;
  margin: 0 20px;
  border-radius: 8px;
  transition: all 0.3s;
  display: grid;
  grid-template-columns: 90px 48px 3fr 2fr 2fr 60px;
  align-items: center;
  column-gap: 10px;

  &:hover {
    background-color: #f5f5f7;
  }
  &.disable {
    opacity: 0.2;
    pointer-events: none;
  }
}
.front {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  justify-content: center;
  column-gap: 6px;
  & .gif {
    width: 22px;
  }
  & .btn {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
}
.title {
  font-size: 18px;
  font-weight: 600;
  color: var(--color-text);
  @include ellipsis;
}
.artists {
  display: flex;
  align-items: center;
  overflow: hidden;
  & > :not(:first-child)::before {
    content: '';
    border-left: 1px solid rgba(0, 0, 0, 0.2);
    margin: 0 6px;
  }
}
</style>
