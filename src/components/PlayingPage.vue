<template>
  <div class="playing-page">
    <div class="wrapper">
      <div class="top">
        <div class="cd">
          <div class="background"></div>
          <img class="image" :src="songImage" alt="" />
        </div>
        <div class="lyric">
          <p class="lyric-line" v-for="(item, index) in lyric" :key="index">
            {{ item.l }}
          </p>
        </div>
        <div class="recommend"></div>
      </div>
      <div class="comment"></div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { ref, computed, watchEffect } from "vue";

import api from "@/api/index.js";

const store = useStore();
const currentSong = computed(() => store.getters.getCurrentSong);

const songImage = computed(() =>
  currentSong.value ? currentSong.value.image : ""
);

const lyric = ref([]);

watchEffect(() => {
  if (currentSong.value) {
    api.song.getLyric(currentSong.value.id).then((response) => {
      if (response.code === 200) {
        const lrc = response.lrc.lyric;

        const lrcs = lrc.split("\n");
        lyric.value = lrcs.map((item) => {
          let t = item.substring(item.indexOf("[") + 1, item.indexOf("]"));
          let l = item.substring(item.indexOf("]") + 1).trim();
          if (l == "") {
            l = ' '
          }

          return {
            t,
            l,
          };
        });

        console.log(lyric.value);
      }
    });
  }
});
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
        background: no-repeat center/90% url(../assets/pictures/cd.png);
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
  }
}

.lyric {
  height: 600px;
  overflow-y: scroll;
}
.lyric-line {
  white-space: pre-wrap;
  font-size: 16px;
  text-align: center;
}
</style>
