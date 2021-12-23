<template>
  <the-scrollbar>
    <div :class="$style.container">
      <div :class="$style.top">
        <rotate-cd :src="songImage" :running="playingState" />
        <lyric />
      </div>
      <div :class="$style.commentContainer">
        <comment :comments="comments" />
      </div>
    </div>
  </the-scrollbar>
</template>

<script>
import { mapState, mapMutations } from '@/lib/lib.js';
import { ref, computed, watch } from 'vue';

import api from '@/api/index.js';

import RotateCd from './RotateCd.vue';
import Lyric from './Lyric.vue';
import Comment from '@/components/Comment.vue';

export default {
  name: 'PlayingPage',
  components: {
    RotateCd,
    Lyric,
    Comment,
  },
  setup() {
    const comments = ref([]);
    
    const { currentSong, playingState } = mapState();
    
    const songImage = computed(() => (currentSong.value ? currentSong.value.image : ''));
    
    watch(
      () => currentSong.value,
      () => {
        api.comment
          .ofSong({
            id: currentSong.value.id,
            limit: 20,
          })
          .then((response) => {
            if (response.code === 200) {
              comments.value = response.comments;
            }
          });
      },
    );

    return {
      comments,
      songImage,
      playingState,
    }
  }
}

</script>

<style module>
.container {
  padding: 20px;
}
.top {
  max-width: 1000px;
  height: 500px;
  margin: 0 auto;
  margin-top: 20px;
  display: grid;
  grid-template-columns: 1fr 2fr;
  align-items: center;
  column-gap: 100px;
}
.commentContainer {
  max-width: 1000px;
  margin: 0 auto;
}
</style>
