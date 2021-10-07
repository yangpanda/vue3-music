<template>
  <div :class="$style.playerWrap">
    <div :class="$style.left">
      <div :class="$style.cover">
        <the-image :src="songImage + '?param=100y100'" size="50" round="normal" />
        <div :class="[$style.toggle, 'rounded']" @click="setShowPlayingPage(!showPlayingPage)">
          <svg-icon name="arrow-up" color="#f3f3f3"></svg-icon>
        </div>
      </div>
      <div>
        <div class="text-base pointer ellipsis">{{ songName }}</div>
        <div class="text-sm pointer ellipsis">
          <span v-for="artist in songSinger" @click="toArtistDetail(artist.id)">{{ artist.name }}</span>
        </div>
      </div>
    </div>
    <div :class="$style.center">
      <div :class="$style.btns">
        <div :class="$style.mode" @click="changeMode()">
          <svg-button v-if="playMode == 'order'" name="play-mode-order" />
          <svg-button v-else-if="playMode == 'unorder'" name="play-mode-unorder" />
          <svg-button v-else name="play-mode-loop" />
        </div>
        <svg-button @click="methods.preTrack()" name="pre" />
        <svg-button v-if="!playingState" @click="methods.play()" name="play" box />
        <svg-button v-else @click="methods.pause()" name="pause" box />
        <svg-button @click="methods.nextTrack()" name="next" />
      </div>
      <div :class="$style.songSliderWrap">
        <div>{{ formatTime(currentTime) }}</div>
        <div :class="$style.songSlider">
          <n-slider
            :step="1"
            :tooltip="false"
            :max="duration"
            v-model:value="currentTime"
            @update-value="methods.setCurrentTime($event)"
          />
        </div>
        <div>{{ formatTime(duration) }}</div>
      </div>
    </div>
    <div :class="$style.right">
      <div :class="$style.volume">
        <div :class="$style.volumeBtnBox" @click="muted = !muted">
          <svg-button v-if="!muted" name="volume" />
          <svg-button v-else="muted" name="mute" />
        </div>
        <div :class="$style.volumeSlider">
          <n-slider
            :tooltip="false"
            :min="0"
            :max="1"
            :step="0.1"
            v-model:value="volume"
          />
        </div>
      </div>
      <svg-button name="menu" @click="showPlaylist = !showPlaylist" />
    </div>
    <audio
      autoplay
      ref="audio"
      :src="songUrl"
      @timeupdate="methods.getCurrentTime()"
      @ended="methods.nextTrack()"
      @durationchange="methods.getDuration()"
    ></audio>
    <n-drawer v-model:show="showPlaylist" placement="right" :width="600">
      <n-drawer-content title="播放列表" body-content-style="padding: 0;" :native-scrollbar="false">
        <playlist-item
          class="item"
          v-for="(item, index) in playlist"
          :key="index"
          :song="item"
          :index="index"
        />
      </n-drawer-content>
    </n-drawer>
  </div>
</template>

<script setup>
import * as utils from "@/utils/index.js";
import api from "@/api/index.js";
import { ref, computed, watch, onMounted, reactive } from "vue";
import { mapState, mapMutations } from "@/lib/lib.js";
import useRouterMethods from '@/composables/router-methods.js'

import { NDrawer, NDrawerContent, NSlider } from "naive-ui";
import PlaylistItem from "@/components/PlaylistItem.vue"
import SvgIcon from "@/components/SvgIcon.vue";

const {
  toArtistDetail
} = useRouterMethods();
const {
  playingState,
  playIndex,
  playlist,
  playMode,
  randomPlaylist,
  currentSong,
  showPlayingPage,
} = mapState();

const { setPlayingState, setPlayIndex, setCurrentSong, setShowPlayingPage } =
  mapMutations();

const muted = ref(false)
const songUrl = ref("");
const volume = ref(0.3);
const currentTime = ref(0);
const showPlaylist = ref(false);
const duration = ref(0);
const audio = ref({});

const songName = computed(() =>
  currentSong.value ? currentSong.value.name : ""
);
const songImage = computed(() =>
  currentSong.value ? currentSong.value.image : ""
);
const songSinger = computed(() =>
  currentSong.value ? currentSong.value.singer : []
);

watch(
  () => currentSong.value,
  () => {
    api.song.getSongsUrl(currentSong.value.id).then((response) => {
      if (response.code === 200) {
        songUrl.value = response.data[0].url;
      }
    });
  }
);

watch(
  () => volume.value,
  () => {
    audio.value.volume = volume.value
  }
)

watch(
  () => muted.value,
  () => {
    audio.value.muted = muted.value
  }
)

const methods = reactive({
  play: null,
  pause: null,
  getCurrentTime: null,
  getDuration: null,
  setCurrentTime: null,
  nextTrack: null,
  preTrack: null,
});

onMounted(() => {
  audio.value.volume = volume.value;

  methods.play = () => {
    setPlayingState(true);
    audio.value.play();
  };

  methods.pause = () => {
    setPlayingState(false);
    audio.value.pause();
  };

  methods.getCurrentTime = () => {
    currentTime.value = ~~audio.value.currentTime;
  };

  methods.setCurrentTime = (sec) => {
    console.log('lll')
    audio.value.currentTime = sec;
  };

  methods.getDuration = () => {
    duration.value = ~~audio.value.duration;
  };

  methods.nextTrack = () => {
    if (playMode.value === "unorder") {
      const index = randomPlaylist.value.indexOf(playIndex.value);
      if (index + 1 >= randomPlaylist.value.length) {
        setPlayIndex(randomPlaylist.value[0]);
      } else {
        setPlayIndex(randomPlaylist.value[index + 1]);
      }
      setCurrentSong(playlist.value[playIndex.value]);
    } else {
      setPlayIndex(playIndex.value + 1);
      setCurrentSong(playlist.value[playIndex.value]);
    }
    setPlayingState(true);
  };

  methods.preTrack = () => {
    if (playMode.value === "unorder") {
      const index = this.randomPlaylist.indexOf(playIndex.value);
      if (index - 1 < 0) {
        setPlayIndex(randomPlaylist.value[randomPlaylist.value.length - 1]);
      } else {
        setPlayIndex(randomPlaylist.value[index - 1]);
      }
      setCurrentSong(playlist.value[playIndex.value]);
    } else {
      setPlayIndex(playIndex.value - 1);
      setCurrentSong(playlist.value[playIndex.value]);
    }
    setPlayingState(true);
  };

  // this.changeMode = (() => {
  //   let count = 0;
  //   const audio = this.$refs.audio;

  //   return function () {
  //     count++;
  //     switch (count % 3) {
  //       case 0:
  //         audio.loop = false;
  //         this.setPlayMode("order");
  //         break;
  //       case 1:
  //         this.setPlayMode("unorder");
  //         break;
  //       case 2:
  //         audio.loop = true;
  //         this.setPlayMode("loop");
  //         break;
  //     }
  //   };
  // })();
});

//   decreaseVolume() {
//     if (this.volume > 0 && this.volume > 0.2) {
//       this.volume = this.volume - 0.1;
//       this.$refs.audio.volume = this.volume;
//       console.log(this.$refs.audio.volume);
//     }
//   },
//   increaseVolume() {
//     if (this.volume < 1) {
//       this.volume = this.volume + 0.1;
//       this.$refs.audio.volume = this.volume;
//       console.log(this.$refs.audio.volume);
//     }
//   },
//   toggleMuted() {
//     this.$refs.audio.muted = !this.$refs.audio.muted;
//   },
//   orderPlay() {
//     this.$store.state.currentSong = this.$store.state.playlists[1];
//   },

function formatTime(seconds) {
  let minute = parseInt(seconds / 60);
  let second = utils.formatNumber(seconds - minute * 60);

  return minute + ":" + second;
}
</script>

<style module>
.playerWrap {
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
  column-gap: 2rem;
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