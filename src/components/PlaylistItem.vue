<template>
  <div class="wrapper" @dblclick="play(index)" :class="{ playing: playing }">
    <div class="name ellipsis">{{ song.name }}</div>
    <div class="artist ellipsis">
      <a class="link" v-for="(item, index) in song.singer" :key="index">
        <span v-if="index > 0" style="cursor: default"> / </span>
        {{ item }}
      </a>
    </div>
    <div class="duration">{{ song.duration }}</div>
  </div>
</template>

<script>
import { mapState } from "@/lib/lib.js";
import { computed } from "vue";

export default {
  name: "PlaylistItem",
  props: {
    song: {
      type: Object,
    },
    index: {
      type: Number
    }
  },
  setup(props) {
    const {playIndex} = mapState()

    const playing = computed(() => props.index === playIndex.value);

    return {
      playing,
    };
  },
};
</script>

<style scoped lang="scss">
.wrapper {
  display: grid;
  grid-template-columns: 3fr 2fr 50px;
  align-items: center;
  column-gap: 10px;
  height: 36px;
  padding: 0 10px;

  &:nth-child(even) {
    background-color: rgba(0, 0, 0, 0.05);
  }
}

.playing {
  color: red;
}
</style>
