<template>
  <div :class="$style.container">
    <div :class="$style.info">
      <div :class="$style.name">{{ songName }}</div>
      <div :class="$style.infoSub">
        <div>
          <span>专辑：</span>
          <the-link :to="{ name: 'AlbumDetail', params: { id: albumId } }">{{ albumName }}</the-link>
        </div>
        <div>
          <span>歌手：</span>
          <the-link
            :class="$style.artist"
            v-for="item in artists"
            key="item.id"
            :to="{ name: 'ArtistDetail', params: { id: item.id } }"
          >
            {{ item.name }}
          </the-link>
        </div>
      </div>
    </div>
    <n-scrollbar>
      <div :class="$style.lyric">
        <p v-for="(item, index) in lyric" :key="index">{{ item.l }}</p>
      </div>
    </n-scrollbar>
  </div>
</template>

<script>
import api from '@/api/index.js';
import { ref, watch, reactive, toRefs, computed } from 'vue';
import { NScrollbar } from 'naive-ui';
import { useStore } from 'vuex';

export default {
  name: 'Lyric',
  components: {
    NScrollbar,
  },
  setup() {
    const lyric = ref([]);
    const state = reactive({
      albumName: '',
      songName: '',
      albumId: 0,
      artists: [],
    });

    const store = useStore();
    const currentSong = computed(() => store.getters['player/currentSong']);

    watch(
      () => currentSong.value,
      () => {
        if (currentSong.value) {
          state.albumName = currentSong.value.album.name;
          state.songName = currentSong.value.name;
          state.artists = currentSong.value.artists;
          state.albumId = currentSong.value.album.id;

          api.song.getLyric(currentSong.value.id).then((response) => {
            if (response.code === 200) {
              const lrc = response.lrc.lyric;

              const lrcs = lrc.split('\n');
              lyric.value = lrcs.map((item) => {
                let t = item.substring(item.indexOf('[') + 1, item.indexOf(']'));
                let l = item.substring(item.indexOf(']') + 1).trim();
                if (l == '') {
                  l = ' ';
                }

                return {
                  t,
                  l,
                };
              });
            }
          });
        }
      },
    );

    return {
      lyric,
      ...toRefs(state),
    };
  },
};
</script>

<style module>
.container {
  height: 100%;
  overflow: hidden;
  min-width: 400px;
}
.info {
  margin-bottom: 20px;
}
.name {
  font-size: 26px;
  font-weight: bold;
}
.infoSub {
  display: flex;
  column-gap: 30px;
}
.artist:nth-of-type(even) {
  margin-left: 10px;
}
.lyric {
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  color: #424242;
}
</style>
