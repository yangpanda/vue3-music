<template>
  <div class="wrapper">
    <div class="control-buttons">
      <div class="modes" @click="changeMode()">
        <svg-icon
          v-if="playMode == 'order'"
          iconName="#icon-play-mode-order"
          size="24"
        />
        <svg-icon
          v-else-if="playMode == 'unorder'"
          iconName="#icon-play-mode-unorder"
          size="24"
        />
        <svg-icon v-else iconName="#icon-play-mode-loop" size="24" />
      </div>
      <svg-icon @click="preTrack()" iconName="#icon-pre" size="24" />
      <svg-icon
        v-if="!isPlaying"
        @click="play()"
        iconName="#icon-play"
        size="30"
      />
      <svg-icon v-else @click="pause()" iconName="#icon-pause" size="30" />
      <svg-icon @click="nextTrack()" iconName="#icon-next" size="24" />
      <svg-icon @click="toggleLyric()" iconName="#icon-lyric" size="21" />
    </div>
    <div class="progress">
      <span>{{ formatTime(currentTime) }}</span>
      <the-slider :duration="duration" :currentTime="currentTime"></the-slider>
      <span>{{ formatTime(duration) }}</span>
    </div>
    <!-- <button @click="increaseVolume()">inc</button> -->
    <!-- <button @click="decreaseVolume()">dec</button> -->
    <!-- <button @click="toggleMuted()">toggle muted</button> -->
    <audio
      autoplay
      ref="audio"
      :src="url"
      @ended="ended()"
      @timeupdate="getCurrentTime()"
      @durationchange="getDuration()"
    ></audio>
  </div>
</template>

<script>
import * as utils from "@/utils/index.js";
import { ref, computed, watch } from "vue";
import { useStore } from "vuex";
import TheSlider from "@/components/TheSlider.vue";
import * as song from "@/api/service/song.js";

export default {
  name: "AudioPlayer",
  components: {
    TheSlider,
  },
  data() {
    return {
      volume: 0.4,
      isPlaying: true,
      currentTime: 0,
      duration: 0,
    };
  },
  props: {},
  emits: {
    changeCurrentTime(val) {
      console.log(val);
      this.currentTime = val;
      return true;
    },
  },
  setup() {
    const store = useStore();
    const playIndex = computed(() => store.getters.getPlayIndex);
    const playlist = computed(() => store.getters.getPlaylist);

    const setPlayIndex = (index) => store.commit("setPlayIndex", index);

    const url = ref("");
    const getSongUrl = async (id) => {
      const res = await song.getSongsUrl(id);
      if (res.code === 200) {
        url.value = res.data[0].url;
      }
    };
    watch(
      () => playIndex.value,
      () => {
        getSongUrl(playlist.value[playIndex.value].id);
      }
    );

    const playMode = ref("order");

    const toggleOrderMode = () => {
      this.$refs.audio.loop = false
      playMode.value = "order";
    };

    const toggleLoopMode = () => {
      playMode.value = "loop";
      this.$refs.audio.loop = true;
    };

    const toggleUnorderMode = () => {
      this.$refs.audio.loop = false
      playMode.value = "unorder";
    };

    const changeMode = (() => {
      let count = 0;

      return function () {
        count++;
        switch (count % 3) {
          case 0:
            toggleOrderMode();
            break;
          case 1:
            toggleUnorderMode();
            break;
          case 2:
            toggleLoopMode();
            break;
        }
      };
    })();

    return {
      url,
      playlist,
      playIndex,
      playMode,
      changeMode,
      setPlayIndex,
    };
  },
  mounted() {
    this.$refs.audio.volume = this.volume;
  },
  methods: {
    ended() {
      this.setPlayIndex(this.playIndex + 1);
    },
    play() {
      this.isPlaying = true;
      this.$refs.audio.play();
    },
    pause() {
      this.isPlaying = false;
      this.$refs.audio.pause();
    },
    nextTrack() {
      this.setPlayIndex(this.playIndex + 1)
    },
    preTrack() {
      this.setPlayIndex(this.playIndex - 1)
    },
    decreaseVolume() {
      if (this.volume > 0 && this.volume > 0.2) {
        this.volume = this.volume - 0.1;
        this.$refs.audio.volume = this.volume;
        console.log(this.$refs.audio.volume);
      }
    },
    increaseVolume() {
      if (this.volume < 1) {
        this.volume = this.volume + 0.1;
        this.$refs.audio.volume = this.volume;
        console.log(this.$refs.audio.volume);
      }
    },
    toggleMuted() {
      this.$refs.audio.muted = !this.$refs.audio.muted;
    },
    orderPlay() {
      this.$store.state.currentSong = this.$store.state.playlists[1];
    },
    toggleLyric() {
      console.log("lyric");
    },
    getCurrentTime() {
      this.currentTime = ~~this.$refs.audio.currentTime;
    },
    setCurrentTime(sec) {
      console.log("slider");
      this.$refs.audio.currentTime = sec;
    },
    getDuration() {
      this.duration = ~~this.$refs.audio.duration;
    },
    formatTime(seconds) {
      let minute = parseInt(seconds / 60);
      let second = utils.formatNumber(seconds - minute * 60);

      return minute + ":" + second;
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;

  .control-buttons {
    display: flex;
    align-items: center;
    column-gap: 20px;

    .modes {
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
  }

  .progress {
    display: flex;
    column-gap: 15px;
    justify-content: center;
    align-items: center;
  }
}
</style>
