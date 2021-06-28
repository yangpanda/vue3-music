<template>
  <div class="card-playlist" @click="toPlaylist(playlist.id)">
    <div
      class="wrapper"
      @mouseenter="showPlayBtn = !showPlayBtn"
      @mouseleave="showPlayBtn = !showPlayBtn"
    >
      <div class="play-count-container absolute">
        <svg-icon
          iconName="#icon-play-outline"
          iconColor="#C0C4CC"
          width="16"
          height="16"
        />
        <span class="count">{{ playlist.playCount }}</span>
      </div>
      <transition name="fade">
        <div
          class="play-button-container round light-shadow"
          v-if="showPlayBtn"
        >
          <svg-icon
            iconName="#icon-play"
            iconColor="#ec4141"
            size="24"
            class="play"
            @click.stop="playAll"
          />
        </div>
      </transition>
      <the-image class="pic" :src="playlist.imgUrl + '?param=400y400'"></the-image>
    </div>
    <div class="title">{{ playlist.name }}</div>
  </div>
</template>

<script>
import TheImage from "components/TheImage.vue";

export default {
  name: "CardPlaylist",
  components: {
    TheImage,
  },
  data() {
    return {
      showPlayBtn: false,
    };
  },
  props: {
    playlist: Object,
  },
  methods: {
    toPlaylist(id) {
      this.$router.push(`/playlist-detail/${id}`);
    },
    playAll() {},
  },
};
</script>

<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.card-playlist {
  cursor: pointer;
  flex-basis: 18%;
  position: relative;

  .wrapper {
    width: 100%;
    padding-top: 100%;
    position: relative;

    .play-count-container {
      top: 5px;
      right: 5px;
      z-index: 1;

      .count {
        color: #C0C4CC;
      }
    }

    .play-button-container {
      position: absolute;
      bottom: 10px;
      right: 10px;
      z-index: 1;
      width: 36px;
      height: 36px;
      background-color: #fff;

      .play {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translateX(-40%) translateY(-50%);
      }
    }

    .pic {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 0;
    }
  }

  .title {
    font-size: var(--font-size-16);
    margin: 5px;
    color: #606266;
  }
}
</style>