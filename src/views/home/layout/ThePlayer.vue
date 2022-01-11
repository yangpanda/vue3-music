<template>
  <div :class="$style.player">
    <!-- 左边部分 -->
    <div :class="$style.left">
      <div :class="$style.cover">
        <the-image :src="currentSong.image + '?param=100y100'" size="50" round="normal" />
        <div :class="$style.toggle" @click="togglePlayingPage">
          <the-icon v-if="!playingPageDisplayStatus" name="arrow-up" color="#f3f3f3" size="28"></the-icon>
          <the-icon v-else name="arrow-down" color="#f3f3f3" size="28"></the-icon>
        </div>
      </div>
      <div>
        <div class="text-base pointer ellipsis">{{ currentSong.name }}</div>
        <div>
          <the-link
            v-for="artist in currentSong.singer"
            :to="{ name: 'ArtistDetail', params: { id: artist.id } }"
            >{{ artist.name }}</the-link
          >
        </div>
      </div>
    </div>
    <!-- 中间部分 -->
    <div :class="$style.center">
      <div :class="$style.btns">
        <div :class="$style.mode" @click="togglePlayMode">
          <the-icon v-if="playMode === PlayMode.sequence" name="sequence" />
          <the-icon v-else-if="playMode === PlayMode.random" name="random" />
          <the-icon v-else-if="playMode === PlayMode.listLoop" name="list-loop" />
          <the-icon v-else="playMode === PlayMode.singleLoop" name="single-loop" />
        </div>
        <the-icon @click="preTrack" name="pre-track" />
        <the-icon v-if="!playing" @click="play" name="play" size="28" />
        <the-icon v-else @click="pause" name="pause" size="28" />
        <the-icon @click="nextTrack" name="next-track" />
      </div>
      <div :class="$style.songSliderWrap">
        <div>{{ formatTime(currentTime) }}</div>
        <div :class="$style.songSlider">
          <n-slider
            :step="1"
            :tooltip="false"
            :max="duration"
            v-model:value="currentTime"
            @update-value="($event) => setCurrentTime($event)"
          />
        </div>
        <div>{{ formatTime(duration) }}</div>
      </div>
    </div>
    <!-- 右边部分 -->
    <div :class="$style.right">
      <div :class="$style.volume">
        <div :class="$style.volumeBtnBox" @click="muted = !muted">
          <the-icon v-if="!muted" name="volume" />
          <the-icon v-else="muted" name="mute" />
        </div>
        <div :class="$style.volumeSlider">
          <n-slider :tooltip="false" :min="0" :max="1" :step="0.1" v-model:value="volume" />
        </div>
      </div>
      <the-icon name="menu" @click="() => (showPlaylist = !showPlaylist)" />
    </div>
    <n-drawer v-model:show="showPlaylist" placement="right" :width="600">
      <n-drawer-content title="播放列表" body-content-style="padding: 0;" :native-scrollbar="false">
        <playlist-item
          class="item"
          v-for="(item, index) in playList"
          :key="index"
          :song="item"
          :index="index"
        />
      </n-drawer-content>
    </n-drawer>
    <audio
      autoplay
      ref="audio"
      :src="url"
      @timeupdate="getCurrentTime"
      @ended="ended"
      @durationchange="getDuration"
    ></audio>
  </div>
</template>

<script>
import { formatTime } from '@/utils/index.js';
import api from '@/api/index.js';
import { ref, computed, watch, toRefs, reactive, onMounted } from 'vue';
import { useStore } from 'vuex';
import { PlayMode } from '@/store/player.js';

import { NDrawer, NDrawerContent, NSlider } from 'naive-ui';
import PlaylistItem from '@/components/PlaylistItem.vue';

export default {
  name: 'ThePlayer',
  components: {
    NDrawer,
    NDrawerContent,
    NSlider,
    PlaylistItem,
  },
  setup() {
    const store = useStore();
    const state = reactive({
      audio: null,
      muted: false,
      volume: 0.3,
      duration: 0,
      url: '',
      currentTime: 0,
    });
    const showPlaylist = ref(false);
    const playing = computed(() => store.state.player.playing);
    const playMode = computed(() => store.state.player.playMode);
    const playList = computed(() => store.state.player.playList);
    const currentSong = computed(() => store.getters['player/currentSong']);
    const reachEnd = computed(() => store.getters['player/reachEnd']);
    const playingPageDisplayStatus = computed(() => store.state.player.playingPageDisplayStatus);

    // methods
    const togglePlayMode = () => store.commit('player/togglePlayMode');
    const togglePlayingPage = () => store.commit('player/togglePlayingPage');
    const setPlaying = (flag) => store.commit('player/setPlaying', flag);
    const nextTrack = () => store.commit('player/nextTrack');
    const preTrack = () => store.commit('player/preTrack');
    const play = () => {
      setPlaying(true);
      state.audio.play();
    };
    const pause = () => {
      setPlaying(false);
      state.audio.pause();
    };
    const getCurrentTime = () => {
      state.currentTime = ~~state.audio.currentTime;
    };
    const setCurrentTime = (sec) => {
      state.audio.currentTime = sec;
      state.duration = ~~state.audio.duration;
    };
    const getDuration = () => {
      state.duration = ~~state.audio.duration;
    };
    const ended = () => {
      if (playMode.value != PlayMode.singleLoop) {
        if (!(playMode.value === PlayMode.sequence && reachEnd.value)) {
          nextTrack();
        } else {
          setPlaying(false);
        }
      }
    };

    watch(
      () => currentSong.value,
      () => {
        api.song.getSongsUrl(currentSong.value.id).then((response) => {
          if (response.code === 200) {
            state.url = response.data[0].url;
          }
        });
      },
    );

    watch(
      () => state.volume,
      () => {
        state.audio.volume = state.volume;
      },
    );

    watch(
      () => playMode.value,
      () => {
        if (playMode.value === PlayMode.singleLoop) {
          state.audio.loop = true;
        } else {
          state.audio.loop = false;
        }
      },
    );

    watch(
      () => state.muted,
      () => {
        state.audio.muted = state.muted;
      },
    );

    onMounted(() => {
      state.audio.volume = state.volume;
    });

    return {
      ...toRefs(state),
      PlayMode,
      showPlaylist,
      playList,
      playing,
      playMode,
      currentSong,
      formatTime,
      playingPageDisplayStatus,
      play,
      pause,
      togglePlayMode,
      togglePlayingPage,
      getCurrentTime,
      setCurrentTime,
      getDuration,
      nextTrack,
      preTrack,
      ended,
    };
  },
};
</script>

<style module>
.player {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  background-color: white;
  padding: 0 2rem;
}
.left {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-shrink: 0;
  column-gap: 1.2rem;
  width: 25rem;
}
.cover {
  position: relative;
  cursor: pointer;
}
.toggle {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(200, 200, 200, 0.2);
  opacity: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(4px);
}
.toggle:hover {
  opacity: 100;
}
.center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-shrink: 1;
  flex-grow: 1;
  height: 100%;
  row-gap: 0.4rem;
}
.btns {
  display: flex;
  align-items: center;
  column-gap: 30px;
}
.mode {
  display: flex;
  justify-content: center;
  align-items: center;
}
.songSliderWrap {
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 1.6rem;
}
.songSlider {
  width: 36rem;
}
.right {
  display: flex;
  flex-shrink: 0;
  justify-content: flex-end;
  align-items: center;
  width: 25rem;
  column-gap: 1.6rem;
}
.volume {
  display: flex;
  align-items: center;
  column-gap: 0.8rem;
}
.volumeBtnBox {
  display: flex;
  justify-content: center;
  align-items: center;
}
.volumeSlider {
  display: flex;
  align-items: center;
  width: 10rem;
}
</style>
