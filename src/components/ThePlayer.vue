<template>
  <div class="wrapper">
    <div class="left">
      <div class="avatar">
        <the-image
          :src="songImage + '?param=100y100'"
          radius="4px"
          width="50px"
        />
        <div
          class="toggle-playing-page"
          @click="showPlayingPage = !showPlayingPage"
        >
          <svg-icon iconName="#icon-arrow-up" iconColor="#f3f3f3"></svg-icon>
        </div>
      </div>
      <div class="info">
        <span class="title ellipsis">{{ songName }}</span>
        <span class="artist ellipsis">{{ songSinger }}</span>
      </div>
    </div>
    <div class="center">
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
        <the-slider
          :duration="duration"
          :currentTime="currentTime"
        ></the-slider>
        <span>{{ formatTime(duration) }}</span>
      </div>
      <audio
        autoplay
        ref="audio"
        :src="url"
        @ended="ended()"
        @timeupdate="getCurrentTime()"
        @durationchange="getDuration()"
      ></audio>
    </div>
    <div class="right">
      <div class="volum"></div>
      <div class="song-list" @click="showPlaylist = !showPlaylist">
        <svg-icon iconName="#icon-play-list"></svg-icon>
      </div>
    </div>
    <playing-page
      class="playing-page"
      :class="{ 'show-playing-page': showPlayingPage }"
    ></playing-page>
    <the-playlist v-show="showPlaylist" class="playlist" />
  </div>
</template>

<script>
import * as utils from "@/utils/index.js";
import { ref, computed, watch } from "vue";
import { useStore } from "vuex";
import TheSlider from "@/components/TheSlider.vue";
import PlayingPage from "@/components/PlayingPage.vue";
import ThePlaylist from "@/components/ThePlaylist.vue";
import * as song from "@/api/service/song.js";

export default {
  name: "AudioPlayer",
  components: {
    TheSlider,
    PlayingPage,
    ThePlaylist
  },
  data() {
    return {
      volume: 0.4,
      isPlaying: true,
      currentTime: 0,
      duration: 0,
      showPlayingPage: false,
      showPlaylist: false,
    };
  },
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
    const playMode = computed(() => store.getters.getPlayMode);
    const randomPlaylist = computed(() => store.getters.getRandomPlaylist);
    const currentSong = computed(() => store.getters.getCurrentSong);

    const setPlayIndex = (index) => store.commit("setPlayIndex", index);
    const setPlayMode = (mode) => store.commit("setPlayMode", mode);
    const setCurrentSong = (song) => store.commit("setCurrentSong", song);

    const songName = computed(() =>
      currentSong.value ? currentSong.value.name : ""
    );
    const songImage = computed(() =>
      currentSong.value ? currentSong.value.image : ""
    );
    const songSinger = computed(() =>
      currentSong.value ? currentSong.value.singer.join(" / ") : ""
    );

    const url = ref("");
    const getSongUrl = async (id) => {
      const res = await song.getSongsUrl(id);
      if (res.code === 200) {
        url.value = res.data[0].url;
      }
    };
    watch(
      () => currentSong.value,
      () => {
        getSongUrl(currentSong.value.id);
      }
    );

    return {
      url,
      song,
      songName,
      songImage,
      songSinger,
      playlist,
      randomPlaylist,
      playIndex,
      playMode,
      setPlayIndex,
      setPlayMode,
      setCurrentSong,
    };
  },
  mounted() {
    this.$refs.audio.volume = this.volume;

    this.changeMode = (() => {
      let count = 0;
      const audio = this.$refs.audio;

      return function () {
        count++;
        switch (count % 3) {
          case 0:
            audio.loop = false;
            this.setPlayMode("order");
            break;
          case 1:
            this.setPlayMode("unorder");
            break;
          case 2:
            audio.loop = true;
            this.setPlayMode("loop");
            break;
        }
      };
    })();
  },
  methods: {
    ended() {
      this.nextTrack();
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
      if (this.playMode === "unorder") {
        const index = this.randomPlaylist.indexOf(this.playIndex)
        if (index + 1 >= this.randomPlaylist.length) {
          this.setPlayIndex(this.randomPlaylist[0])
        } else {
          this.setPlayIndex(this.randomPlaylist[index + 1])
        }
        this.setCurrentSong(this.playlist[this.playIndex]);
      } else {
        this.setPlayIndex(this.playIndex + 1);
        this.setCurrentSong(this.playlist[this.playIndex]);
      }
    },
    preTrack() {
      if (this.playMode === "unorder") {
        const index = this.randomPlaylist.indexOf(this.playIndex)
        if (index - 1 < 0) {
          this.setPlayIndex(this.randomPlaylist[this.randomPlaylist.length - 1])
        } else {
          this.setPlayIndex(this.randomPlaylist[index - 1])
        }
        this.setCurrentSong(this.playlist[this.playIndex]);
      } else {
        this.setPlayIndex(this.playIndex - 1);
        this.setCurrentSong(this.playlist[this.playIndex]);
      }
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
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  background-color: #f6f6f8;
  height: var(--footer-height);

  .left {
    display: flex;
    flex: 1;
    align-items: center;

    .avatar {
      position: relative;
      margin-right: 10px;
      cursor: pointer;
      z-index: auto;

      .toggle-playing-page {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image: radial-gradient(
          rgba(0, 0, 0, 0.2),
          rgba(0, 0, 0, 0.4)
        );
        border-radius: 4px;
        z-index: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        display: none;

        &::after {
          content: "";
          width: 100%;
          height: 100%;
          position: absolute;
          left: 0;
          top: 0;
          background: inherit;
          border-radius: 4px;
          filter: blur(5px);
          z-index: auto;
        }
      }

      &:hover .toggle-playing-page {
        display: flex;
      }
    }

    .info {
      display: grid;
      grid-template-rows: 2;
      row-gap: 8px;

      span {
        height: 1em;
        line-height: 1em;
      }

      .title {
        font-size: 16px;
        cursor: default;
      }

      .artist {
        font-size: 13px;
        cursor: pointer;
      }
    }
  }

  .center {
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

  .right {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .playing-page {
    position: absolute;
    left: 0;
    right: 0;
    bottom: var(--footer-height);
    overflow: hidden;
    height: 0;
    z-index: calc(var(--max-z-index) - 1);
    background-color: #fff;
    transition: height 0.5s;
  }

  .show-playing-page {
    height: calc(100vh - var(--footer-height));
  }

  .playlist {
    position: fixed;
    right: 0;
    top: calc(var(--header-height) + 20px);
    bottom: var(--footer-height);
    z-index: var(--max-z-index);
  }
}
</style>
