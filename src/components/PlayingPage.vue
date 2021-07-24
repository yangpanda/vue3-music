<template>
  <div class="playing-page">
    <div class="wrapper">
      <div class="top">
        <div class="cd">
          <div class="background"></div>
          <img class="image" :src="songImage" alt="" />
        </div>
        <div class="lyric"></div>
      </div>
      <div class="comment"></div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";

export default {
  name: "PlayingPage",
  setup() {
    const store = useStore();
    const playIndex = computed(() => store.getters.getPlayIndex);
    const playlist = computed(() => store.getters.getPlaylist);

    return {
      playlist,
      playIndex,
    };
  },
  computed: {
    songImage() {
      if (this.playlist.length > this.playIndex) {
        return this.playlist[this.playIndex].image;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@keyframes myRotate {
  0% {
    -webkit-transform: rotate(0deg);
  }
  50% {
    -webkit-transform: rotate(180deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

.playing-page {
  .wrapper {
    margin: 0 auto;
    margin-top: calc(var(--header-height) + 20px);
    max-width: 1400px;
  }

  .top {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    .cd {
      position: relative;
      width: 260px;
      height: 260px;
      border-radius: 50%;
      background-color: #e0dfdf;
      animation: myRotate 10s linear infinite;

      .background {
        width: 100%;
        height: 100%;
        background: no-repeat center/90% url(../assets/icons/cd.png);
      }

      .image {
        display: block;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        width: 60%;
        border-radius: 50%;
      }
    }
    .lyric {
    }
  }
  .comment {
  }
}
</style>
