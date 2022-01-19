<template>
  <div :class="$style.player">
    <!-- 左边部分 -->
    <div :class="$style.left">
      <div :class="$style.cover">
        <the-image :src="currentSong.picUrl" size="50" radius="4" />
        <div :class="$style.toggle" @click="togglePlayingPage">
          <the-icon v-if="!playingPageDisplayStatus" name="arrow-up" color="#f3f3f3" size="28"></the-icon>
          <the-icon v-else name="arrow-down" color="#f3f3f3" size="28"></the-icon>
        </div>
      </div>
      <div :class="$style.info">
        <div class="ellipsis">{{ currentSong.name }}</div>
        <div class="ellipsis" :class="$style.artist">
          <the-link
            v-for="artist in currentSong.artists"
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
      <div :class="$style.sliderContainer">
        <div>{{ formatTime(state.currentTime) }}</div>
        <div :class="$style.slider">
          <n-slider
            :step="1"
            :tooltip="false"
            :max="state.duration"
            v-model:value="state.currentTime"
            @update-value="($event) => setCurrentTime($event)"
          />
        </div>
        <div>{{ formatTime(state.duration) }}</div>
      </div>
    </div>
    <!-- 右边部分 -->
    <div :class="$style.right">
      <div :class="$style.volume">
        <div :class="$style.volumeBtn" @click="state.muted = !state.muted">
          <the-icon v-if="!state.muted" name="volume" />
          <the-icon v-else="state.muted" name="mute" />
        </div>
        <div :class="$style.volumeSlider">
          <n-slider :tooltip="false" :min="0" :max="1" :step="0.1" v-model:value="state.volume" />
        </div>
      </div>
      <the-icon name="menu" @click="() => (state.showPlayList = !state.showPlayList)" />
    </div>
    <n-drawer v-model:show="state.showPlayList" placement="right" :width="600">
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
      ref="audioDom"
      :src="state.url"
      @timeupdate="getCurrentTime"
      @ended="ended"
      @durationchange="getDuration"
    ></audio>
  </div>
</template>

<script>
export default {
  name: 'ThePlayer',
};
</script>

<script setup>
import { formatTime } from '@/utils';
import api from '@/api';
import { ref, watch, reactive, onMounted } from 'vue';
import { PlayMode } from '@/store/player.js';
import { NDrawer, NDrawerContent, NSlider } from 'naive-ui';
import PlaylistItem from '@/components/PlaylistItem.vue';
import { useMapGetters, useMapState, useMapMutations } from '@/composables';

const audioDom = ref(null);
const state = reactive({
  muted: false,
  volume: 0.3,
  duration: 0,
  url: '',
  currentTime: 0,
  showPlayList: false,
});
const { playing, playMode, playList, playingPageDisplayStatus } = useMapState('player');
const { currentSong, reachEnd } = useMapGetters('player');
const { togglePlayMode, togglePlayingPage, setPlaying, nextTrack, preTrack } = useMapMutations('player');

// methods
const play = () => {
  setPlaying(true);
  audioDom.value.play();
};
const pause = () => {
  setPlaying(false);
  audioDom.value.pause();
};
const getCurrentTime = () => {
  state.currentTime = ~~audioDom.value.currentTime;
};
const setCurrentTime = (sec) => {
  audioDom.value.currentTime = sec;
  state.duration = ~~audioDom.value.duration;
};
const getDuration = () => {
  state.duration = ~~audioDom.value.duration;
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

onMounted(() => {
  audioDom.value.volume = state.volume;
});

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
    audioDom.value.volume = state.volume;
  },
);

watch(
  () => playMode.value,
  () => {
    if (playMode.value === PlayMode.singleLoop) {
      audioDom.value.loop = true;
    } else {
      audioDom.value.loop = false;
    }
  },
);

watch(
  () => state.muted,
  () => {
    audioDom.value.muted = state.muted;
  },
);
</script>

<style module>
.player {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 80px;
  background-color: white;
  border-top: 1px solid lightgray;
  display: grid;
  grid-template-columns: 250px 1fr 250px;
  align-items: center;
  padding: 0 20px;
}
.left {
  composes: flexVHCenter from '@/styles/mixin.css';
  justify-content: flex-start !important;
}
.cover {
  position: relative;
  cursor: pointer;
  margin-right: 10px;
}
.toggle {
  composes: flexVHCenter from '@/styles/mixin.css';
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(200, 200, 200, 0.2);
  opacity: 0;
  backdrop-filter: blur(4px);
}
.toggle:hover {
  opacity: 100;
}
.info {
  overflow: hidden;
}
.artist > :not(:first-child)::before {
  content: '';
  border-left: 1px solid rgba(0, 0, 0, 0.1);
  margin: 0 6px;
}
.center {
  height: 100%;
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
.btns {
  composes: flexVCenter from '@/styles/mixin.css';
}
.btns > :not(:first-child) {
  margin-left: 30px;
}
.mode {
  composes: flexVHCenter from '@/styles/mixin.css';
}
.sliderContainer {
  composes: flexVHCenter from '@/styles/mixin.css';
}
.sliderContainer > :not(:first-child) {
  margin-left: 16px;
}
.slider {
  width: 360px;
}
.right {
  composes: flexVHCenter from '@/styles/mixin.css';
  justify-content: flex-end !important;
}
.right > :not(:first-child) {
  margin-left: 16px;
}
.volume {
  display: flex;
  align-items: center;
}
.volume > :not(:first-child) {
  margin-left: 10px;
}
.volumeBtn {
  composes: flexVHCenter from '@/styles/mixin.css';
}
.volumeSlider {
  composes: flexVCenter from '@/styles/mixin.css';
  width: 100px;
}
</style>
