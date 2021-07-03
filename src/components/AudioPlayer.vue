<template>
  <div class="wrapper">
    <button @click="pause()">pause</button>
    <button @click="play()">play</button>
    <button>next</button>
    <button>pre</button>
    <button @click="increaseVolume()">inc</button>
    <button @click="decreaseVolume()">dec</button>
    <button @click="toggleMuted()">toggle muted</button>
    <audio autoplay controls ref="audio" :src="songUrl" @ended="orderPlay()"></audio>
  </div>
</template>

<script>
export default {
  name: "AudioPlayer",
  data() {
    return {
      volume: 0.4,
    }
  },
  props: {},
  mounted() {
    this.$refs.audio.volume = this.volume
  },
  computed: {
    songUrl() {
      return this.$store.state.currentSong === null
        ? ""
        : this.$store.state.currentSong.url;
    },
  },
  methods: {
    play() {
      this.$refs.audio.play()
    },
    pause() {
      this.$refs.audio.pause()
    },
    nextTrack() {},
    preTrack() {},
    decreaseVolume() {
      if (this.volume > 0 && this.volume > 0.2) {
        this.volume = this.volume - 0.1
        this.$refs.audio.volume = this.volume
        console.log(this.$refs.audio.volume);
      }
    },
    increaseVolume() {
      if (this.volume < 1) {
        this.volume = this.volume + 0.1
        this.$refs.audio.volume = this.volume
        console.log(this.$refs.audio.volume);
      }
    },
    toggleMuted() {
      this.$refs.audio.muted = !this.$refs.audio.muted
    },
    orderPlay() {
      this.$store.state.currentSong = this.$store.state.playlists[1]
    }
  },
};
</script>

<style lang="scss" scoped>
</style>
