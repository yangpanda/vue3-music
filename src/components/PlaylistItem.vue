<template>
  <div :class="[$style.playlistItem, playing ? 'playing' : '']" @dblclick="play(index)">
    <div :class="['ellipsis']">{{ song.name }}</div>
    <div :class="[$style.artistBox, 'ellipsis']">
      <span
        :class="[$style.artist, 'cursor-pointer']"
        v-for="singer in song.singer"
        @click="toArtistDetail(singer.id)"
        >{{ singer.name }}</span
      >
    </div>
    <div :class="$style.duration">{{ song.duration }}</div>
  </div>
</template>

<script>
import { mapState } from '@/lib/lib.js';
import { computed } from 'vue';
import useRouterMethods from '../composables/router-methods';

export default {
  name: 'PlaylistItem',
  props: {
    song: {
      type: Object,
    },
    index: {
      type: Number,
    },
  },
  setup(props) {
    const { playIndex } = mapState();
    const { toArtistDetail } = useRouterMethods();

    const playing = computed(() => props.index === playIndex.value);

    return {
      playing,
      toArtistDetail,
    };
  },
};
</script>

<style module>
.playlistItem {
  display: grid;
  grid-template-columns: 3fr 2fr 50px;
  align-items: center;
  column-gap: 10px;
  height: 36px;
  padding: 0 10px;
  cursor: default;
}
.playlistItem:nth-child(even) {
  background-color: rgba(0, 0, 0, 0.05);
}

.artistBox {
  display: flex;
  column-gap: var(--gap-sm);
  color: #666666;
}
.artist:hover {
  color: black;
}
.duration {
  color: #a1a1a1;
}

.playing {
  color: red;
}
</style>
