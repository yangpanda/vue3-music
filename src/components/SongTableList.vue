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
    />
  </div>
</template>

<script>
import SongTableListItem from "components/SongTableListItem.vue";

export default {
  name: "SongTableList",
  props: {
    songs: {
      type: Array,
    },
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
    grid-template-columns: 5% 35% 25% 30% 5%;
    padding: 0 20px;
    line-height: 36px;
    color: var(--text-gray-200);
  }
}
</style>