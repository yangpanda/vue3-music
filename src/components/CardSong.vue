<template>
  <div class="card-song flex-vertical-center clearfix" @click="play(song)">
    <div class="wrapper shadow">
      <div class="play-button-container round light-shadow">
        <svg-icon
          iconName="#icon-play"
          iconColor="#ec4141"
          size="18"
          class="play"
        />
      </div>
      <the-image
        class="pic"
        :src="song.picUrl + '?param=100y100'"
        radius="4px"
      />
    </div>
    <div class="info flex">
      <div class="title">{{ song.name }}</div>
      <div class="artist">老狼</div>
    </div>
  </div>
</template>

<script>
import { fetchSongsUrl } from "api/methods.js";

export default {
  name: "CardSong",
  props: {
    song: {
      type: Object,
    },
  },
  methods: {
    async play(song) {
      const res = await fetchSongsUrl(song.id);
      song.url = res.data[0].url;
      this.$store.commit("setCurrentSong", song);
    },
  },
};
</script>

<style lang="scss" scoped>
.card-song {
  flex-basis: 32%;
  height: 48px;

  .wrapper {
    position: relative;
    width: 48px;
    height: 48px;
    flex-shrink: 0;
    cursor: pointer;

    .play-button-container {
      position: absolute;
      top: 50%;
      left: 50%;
      z-index: 1;
      transform: translateX(-50%) translateY(-50%);
      width: 24px;
      height: 24px;
      background-color: rgba(248, 244, 244, 0.8);
      border: 1px solid #c2c4cc;

      .play {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translateX(-38%) translateY(-50%);
      }
    }

    .pic {
      position: relative;
      z-index: 0;
    }
  }

  .info {
    flex-direction: column;
    margin-left: 10px;
    height: 100%;
    justify-content: space-around;

    .title {
      font-size: 14px;
      line-height: 14px;
      color: #606266;
    }

    .artist {
      font-size: 14px;
      line-height: 14px;
      color: #606266;
    }
  }
}
</style>
