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
      <div class="control-tools">
        <div class="play-mode clearfix">
          <svg-icon
            class="order-mode"
            iconName="#icon-liebiaoxunhuan"
            width="22px"
            height="22px"
            fill="#f6cdcd"
          />
          <svg-icon
            class="random-mode"
            iconName="#icon-suijibofang"
            width="22px"
            height="22px"
            fill="#f6cdcd"
          />
          <svg-icon
            class="single-mode"
            iconName="#icon-danquxunhuan"
            width="22px"
            height="22px"
            fill="#f6cdcd"
          />
        </div>
        <div class="play-control">
          <svg-icon
            class="pre"
            iconName="#icon-shangyiqu"
            width="22px"
            height="22px"
            fill="#f6cdcd"
          />
          <div class="play-pause">
            <svg-icon
              class="play"
              iconName="#icon-zantingbofang"
              width="22px"
              height="22px"
              fill="#f6cdcd"
            />
            <svg-icon
              class="pause"
              iconName="#icon-bofangzhong"
              width="22px"
              height="22px"
              fill="#f6cdcd"
            />
          </div>
          <svg-icon
            class="next"
            iconName="#icon-xiayiqu"
            width="22px"
            height="22px"
            fill="#f6cdcd"
          />
        </div>
      </div>
      <div class="progress-bar">
        <span class="consume-time">00:23</span>
        <div class="bar-container">
          <div class="bar">
            <div class="consume-bar">
              <div class="btn"></div>
            </div>
          </div>
        </div>
        <span class="left-time">01:11</span>
      </div>
    </div>
    <div class="right">
      <div class="volum"></div>
      <div class="song-list"></div>
    </div>
    <audio :src="songURL" autoplay></audio>
    <playing-page
      class="playing-page"
      :class="{ 'show-playing-page': showPlayingPage }"
    ></playing-page>
  </div>
</template>

<script>
import TheImage from "./TheImage.vue";
import PlayingPage from "components/PlayingPage.vue";

export default {
  name: "Player",
  components: { TheImage, PlayingPage },
  data() {
    return {
      showPlayingPage: false,
    };
  },
  computed: {
    songURL() {
      return this.$store.state.currentSong === null
        ? ""
        : this.$store.state.currentSong.url;
    },
    songName() {
      return this.$store.state.currentSong === null
        ? ""
        : this.$store.state.currentSong.name;
    },
    albumImg() {
      return this.$store.state.currentSong === null
        ? ""
        : this.$store.state.currentSong.image;
    },
    songArtist() {
      return this.$store.state.currentSong === null
        ? ""
        : this.$store.state.currentSong.singer.join(" / ");
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
    height: 0;
    left: 0;
    right: 0;
    bottom: var(--footer-height);
    z-index: calc(var(--max-z-index) - 1);
    background-color: rgba(255, 255, 255, 0.8);
    transition: height 0.5s;
  }

  .show-playing-page {
    height: calc(100vh);
  }
}
</style>
