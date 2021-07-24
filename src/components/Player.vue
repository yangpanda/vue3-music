<template>
  <div class="player">
    <div class="left">
      <div class="avatar">
        <the-image
          :src="albumImg + '?param=100y100'"
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
        <span class="artist ellipsis">{{ songArtist }}</span>
      </div>
    </div>
    <div class="center">
      <audio-player></audio-player>
    </div>
    <div class="right">
      <div class="volum"></div>
      <div class="song-list"></div>
    </div>
    <playing-page
      class="playing-page"
      :class="{ 'show-playing-page': showPlayingPage }"
    ></playing-page>
  </div>
</template>

<script>
import TheImage from "./TheImage.vue";
import PlayingPage from "@/components/PlayingPage.vue";
import AudioPlayer from "@/components/AudioPlayer.vue";

import { ref, computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "Player",
  components: {
    TheImage,
    PlayingPage,
    AudioPlayer,
  },
  data() {
    return {
      showPlayingPage: false,
    };
  },
  setup() {
    const store = useStore();
    const playIndex = computed(() => store.getters.getPlayIndex);
    const playlist = computed(() => store.getters.getPlaylist);

    const setPlayIndex = (index) => store.commit("setPlayIndex", index);

    return {
      playIndex,
      playlist,
      setPlayIndex
    }
  },
  computed: {
    songName() {
      return this.playlist.length === 0
        ? ""
        : this.playlist[this.playIndex].name;
    },
    albumImg() {
      return this.playlist.length === 0
        ? ""
        : this.playlist[this.playIndex].image;
    },
    songArtist() {
      return this.playlist.length === 0
        ? ""
        : this.playlist[this.playIndex].singer.join(" / ");
    },
  },
};
</script>

<style lang="scss" scoped>
.player {
  height: var(--footer-height);
  padding: 0 10px;
  background-color: #f6f6f8;
  display: flex;
  justify-content: space-between;
  align-items: center;

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
    justify-content: center;
    flex: 1;

    .control-tools {
      display: flex;
      align-items: center;
      margin-bottom: 5px;

      .play-mode {
        position: relative;
        width: 22px;
        height: 22px;

        & > svg {
          position: absolute;
          left: 0;
          top: 0;
        }

        .order-mode {
          // display none
        }

        .random-mode {
          display: none;
        }

        .single-mode {
          display: none;
        }
      }

      .play-control {
        display: flex;
        align-items: center;
        margin-left: 25px;

        .play-pause {
          margin: 0 15px;
          width: 35px;
          height: 35px;
          background-color: rgba(0, 0, 0, 0.05);
          border-radius: 50%;
          position: relative;

          &:hover {
            background-color: rgba(0, 0, 0, 0.1);
          }

          .play {
            position: absolute;
            float: left;
            left: 50%;
            top: 50%;
            transform: translateX(-50%) translateY(-50%);
          }

          .pause {
            position: absolute;
            float: left;
            left: 50%;
            top: 50%;
            transform: translateX(-50%) translateY(-50%);
          }
        }
      }
    }

    .progress-bar {
      display: flex;
      align-items: center;

      span {
        display: block;
      }

      .bar-container {
        display: flex;
        align-items: center;
        height: 16px;
        background-color: transparent;

        .bar {
          width: 360px;
          height: 4px;
          background-color: rgba(0, 0, 0, 0.1);
          margin: 0 10px;
          border-radius: 2px;
          position: relative;

          .consume-bar {
            position: absolute;
            left: 0;
            top: 0;
            height: 4px;
            width: 100px;
            background-color: red;

            .btn {
              display: none;
              width: 12px;
              height: 12px;
              background-color: red;
              border-radius: 50%;
              position: absolute;
              top: 50%;
              right: 0;
              transform: translateY(-50%);
            }
          }
        }

        &:hover .bar {
          height: 6px;
          border-radius: 4px;
        }

        &:hover .bar .consume-bar {
          height: 6px;
          border-radius: 4px;
        }

        &:hover .bar .consume-bar .btn {
          display: block;
        }
      }
    }
  }

  .right {
    flex: 1;
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
}
</style>
