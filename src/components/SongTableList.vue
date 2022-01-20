<template>
  <div>
    <div :class="$style.header">
      <div></div>
      <div></div>
      <div>音乐标题</div>
      <div>歌手</div>
      <div>专辑</div>
      <div>时长</div>
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
  grid-template-columns: 90px 48px 3fr 2fr 2fr 60px;
  align-items: center;
  column-gap: 10px;
  padding: 0 20px;
  cursor: default;
  height: 50px;
  margin: 0 20px;
  font-size: 18px;
  font-weight: 600;
}
</style>
