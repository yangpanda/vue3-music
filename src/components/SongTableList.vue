<template>
  <div>
    <div :class="$style.header">
      <div class="index"></div>
      <div class="title">音乐标题</div>
      <div class="artist">歌手</div>
      <div class="album">专辑</div>
      <div class="duration">时长</div>
    </div>
    <song-table-list-item
      v-for="(item, index) in songs"
      :key="item.id"
      :song="item"
      :index="index"
      @play="onPlay()"
    />
  </div>
</template>

<script>
import SongTableListItem from '@/components/SongTableListItem.vue';
import { useMapMutations, useMapState } from '../composables';

export default {
  name: 'SongTableList',
  props: {
    songs: {
      type: Array,
    },
  },
  setup(props) {
    const { playList } = useMapState('player');
    const { setPlayList, setRandomPlayList } = useMapMutations('player');

    const onPlay = () => {
      if (!Object.is(playList, props.songs)) {
        setPlayList(props.songs);
        setRandomPlayList();
      }
    };

    return {
      onPlay,
    };
  },
  components: {
    SongTableListItem,
  },
};
</script>

<style module>
.header {
  display: grid;
  grid-template-columns: 80px 3fr 2fr 2fr 60px;
  column-gap: var(--gap-lg);
  padding: 0 2rem;
  cursor: default;
  height: 3.2rem;
}
</style>
