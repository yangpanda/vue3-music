<template>
  <div :class="[$style.playlistItem, playing ? $style.playing : '']" @dblclick="play(index)">
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
export default {
  name: 'PlaylistItem',
};
</script>
<script setup>
import { computed } from 'vue';
import useRouterMethods from '../composables/router-methods';
import { useStore } from 'vuex';

const store = useStore();
const props = defineProps({
  song: {
    type: Object,
  },
  index: {
    type: Number,
  },
});
const { toArtistDetail } = useRouterMethods();
const currentIndex = computed(() => store.state.player.currentIndex);

const playing = computed(() => props.index == currentIndex.value);
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
  background-color: rgba(0, 0, 0, 0.2);
}
</style>
