<template>
  <div class="song-table-list-item" @dblclick="play(index)">
    <div class="front">
      <span class="index">{{ formatIndex(index + 1) }}</span>
      <div class="buttons" style="cursor: pointer">
        <!-- <svg-icon v-if="isPlayling" iconName="#icon-voice-playing" size="20" iconColor="#ec4141" /> -->
        <svg-icon
          v-if="!isLiked(song.id)"
          iconName="#icon-love"
          size="20"
          iconColor="#909399"
        />
        <svg-icon
          v-else
          iconName="#icon-love-selected"
          size="20"
          iconColor="#ec4141"
        />
      </div>
    </div>
    <div class="name ellipsis">{{ song.name }}</div>
    <div class="artist ellipsis">
      <a class="link" v-for="(item, index) in song.singer" :key="index">
        <span v-if="index > 0" style="cursor: default"> / </span>
        {{ item }}
      </a>
    </div>
    <div class="album ellipsis">
      <a class="link">{{ song.album }}</a>
    </div>
    <div class="duration">{{ song.duration }}</div>
  </div>
</template>

<script>
import * as utils from "@/utils/index.js";
import { useStore } from 'vuex';

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
    const store = useStore()
    const setPlayIndex = (index) => store.commit("setPlayIndex", index)

    const play = (index) => {
      emit('play', index)
      setPlayIndex(index)
    }
    return {
      play,
      setPlayIndex
    }
  },
  methods: {
    formatIndex(num) {
      return utils.formatNumber(num);
    },
    isLiked(id) {
      const likedSongs = this.$store.state.likedSongList
      return likedSongs
        ? likedSongs.has(id)
        : false;
    },
  },
};
</script>

<style lang="scss" scoped>
.song-table-list-item {
  padding: 0 20px;
  height: 42px;
  display: grid;
  grid-template-columns: 80px 3fr 2fr 2fr 60px;
  align-items: center;
  column-gap: 20px;
  color: var(--text-gray-200);
  cursor: default;

  &:nth-child(even) {
    background-color: rgba(0, 0, 0, 0.05);
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.09);
  }

  .front {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .index {
      width: 2em;
      text-align: right;
    }

    .buttons {
      display: flex;
      align-items: center;
    }
  }

  .name {
    color: var(--text-gray-400);
  }
}
</style>
