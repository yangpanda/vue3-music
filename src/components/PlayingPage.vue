<template>
  <div class="playing-page">
    <img :src="songImage" class="background-image" />
    <div class="playing-page-content">
      <div class="top flex space-between">
        <div class="cd" :class="{'cd-rotate': playingState}">
          <div class="cd-background"></div>
          <img class="cd-image" :src="songImage + '?param=100y100'" alt="" />
        </div>
        <div class="lyric-container">
          <h1 class="song-title text-center">{{ songName }}</h1>
          <div class="song-artist text-center">{{ songArtist }}</div>
          <div class="lyric-content">
            <p class="lyric-line" v-for="(item, index) in lyric" :key="index">
              {{ item.l }}
            </p>
          </div>
        </div>
        <div class="recommend">ddd</div>
      </div>
      <div class="comment"></div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { ref, computed, watchEffect, inject } from "vue";

import api from "@/api/index.js";


const store = useStore();
const currentSong = computed(() => store.getters.getCurrentSong);

const songImage = computed(() =>
  currentSong.value ? currentSong.value.image : ""
);
const songName = computed(() =>
  currentSong.value ? currentSong.value.name : ""
);
const songArtist = computed(() =>
  currentSong.value ? currentSong.value.singer.join(" / ") : ""
);
const playingState = computed(() => store.getters.getPlayingState);

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
            l = " ";
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

<style scoped>
@keyframes cdRotate {
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
.cd-rotate {
  animation: cdRotate 10s linear infinite;
}

.background-image {
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  filter: blur(300px);
  z-index: -1;
}
.playing-page-content {
  position: relative;
  margin: 0 auto;
  margin-top: calc(var(--header-height) + 20px);
  max-width: 1100px;
  height: 600px;
  overflow-y: scroll;
}
.cd {
  position: relative;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.08);
  flex-shrink: 0;
  align-self: center;
}
.cd-background {
  width: 100%;
  height: 100%;
  background: no-repeat center/90% url(../assets/pictures/cd.png);
}
.cd-image {
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  width: 60%;
  border-radius: 50%;
}

.lyric-container {
  max-width: 600px;
  height: 600px;
  overflow: hidden;
}
.lyric-content {
  width: 100%;
  position: relative;
  top: 300px;
}
.lyric-line {
  white-space: pre-wrap;
  font-size: 16px;
  text-align: center;
}
.lyric-line-active {
  font-size: 18px;
  font-weight: bold;
}
.recommend {
  width: 200px;
  height: 800px;
  flex-shrink: 0;
}
</style>
