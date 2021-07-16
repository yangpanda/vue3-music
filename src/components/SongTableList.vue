<template>
  <div class="song-table-list">
    <div class="song-table-list-header">
      <div class="index"></div>
      <div class="title">音乐标题</div>
      <div class="artist">歌手</div>
      <div class="album">专辑</div>
      <div class="duration">时长</div>
    </div>
    <song-table-list-item
      v-for="(item, index) in songs"
      :key="index"
      :song="item"
      :index="index"
      @play="onPlay()"
    />
  </div>
</template>

<script>
import SongTableListItem from "@/components/SongTableListItem.vue";
import { useStore } from 'vuex';
import { computed } from '@vue/runtime-core';

export default {
  name: "SongTableList",
  props: {
    songs: {
      type: Array,
    },
  },
  setup(props) {
    const store = useStore()

    const playlist = computed(() => store.getters.getPlaylist)
    const setPlaylist = (list) => store.commit('setPlaylist', list)

    const onPlay = () => {
      if (playlist !== props.songs) {
        setPlaylist(props.songs)
      }
    }

    return {
      onPlay
    }
  },
  components: {
    SongTableListItem,
  },
};
</script>

<style lang="scss" scoped>
.song-table-list {
  .song-table-list-header {
    height: 36px;
    display: grid;
    grid-template-columns: 80px 3fr 2fr 2fr 60px;
    column-gap: 20px;
    padding: 0 20px;
    line-height: 36px;
    color: var(--text-gray-200);
  }
}
</style>
