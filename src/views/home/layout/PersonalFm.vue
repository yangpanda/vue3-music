<template>
  <n-scrollbar>
    <div :class="$style.fm">
      <div :class="$style.top">
        <div :class="$style.player">
          <div :class="$style.imageBox">
            <the-image v-if="song" :src="song.image + '?param=280y280'" round="normal"></the-image>
          </div>
          <div :class="$style.btnBox">
            <svg-button @click="() => pointer++" name="next" size="38" />
          </div>
        </div>
        <div :class="$style.songInfo">
          <lyric></lyric>
        </div>
      </div>
    </div>
  </n-scrollbar>
</template>

<script>
import { ref, watch, watchEffect, onMounted } from 'vue';
import api from '@/api/index.js';
import Song from '@/model/Song.js';
import { mapMutations } from '@/lib/lib.js';
import Lyric from '@/views/home/layout/components/playing-page/Lyric.vue';
import { NScrollbar } from 'naive-ui';

export default {
  name: 'PersonalFm',
  components: {
    Lyric,
    NScrollbar,
  },
  setup() {
    const songs = ref([]);
    const pointer = ref(null);
    const song = ref({});
    const { setCurrentSong } = mapMutations();

    const getFm = () => {
      api.fm.getFm().then((res) => {
        console.log(res);
        if (res.code === 200) {
          songs.value = res.data.map((item) => new Song(item));
          pointer.value = 0;
        }
      });
    };

    watch(
      () => pointer.value,
      () => {
        song.value = songs.value[pointer.value];
        setCurrentSong(song.value);
      },
    );

    watchEffect(() => {
      if (pointer.value === 3) {
        getFm();
      }
    });

    onMounted(() => getFm());

    return {
      song,
      pointer,
    };
  },
};
</script>

<style module>
.fm {
  width: 100rem;
  margin: 0 auto;
}
.top {
  display: flex;
  align-items: center;
}
.player {
  display: flex;
  flex-direction: column;
}
.imageBox {
  width: 28rem;
  height: 28rem;
}
.btnBox {
}
.songInfo {
  height: 400px;
}
</style>
