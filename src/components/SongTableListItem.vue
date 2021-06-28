<template>
  <div class="song-table-list-item">
    <div class="front">
      <span class="index">{{ index }}</span>
      <div class="buttons">
        <svg-icon iconName="#icon-play" size="20" @click="play(song)" />
        <svg-icon iconName="#icon-love" size="20" />
      </div>
    </div>
    <div class="name ellipsis">{{ song.name }}</div>
    <div class="artist ellipsis">{{ song.artist }}</div>
    <div class="album ellipsis">{{ song.album }}</div>
    <div class="duration">{{ song.duration }}</div>
  </div>
</template>

<script>
import { fetchSongsUrl } from "api/methods.js";

export default {
  name: "SongTableListItem",
  props: {
    song: {
      type: Object,
    },
    index: {
      type: Number,
    },
  },
  methods: {
    async play(song) {
      const res = await fetchSongsUrl(song.id);
      song.url = res.data[0].url;
      this.$store.commit("setCurrentSong", song);
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

  &:nth-child(even) {
    background-color: rgba(0, 0, 0, 0.05);
  }

  .front {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .index {
      width: 2em;
      text-align: center;
    }

    .buttons {
      display: flex;
      align-items: center;
    }
  }

  .name {
    color: var(--text-gray-200);
  }
}
</style>
