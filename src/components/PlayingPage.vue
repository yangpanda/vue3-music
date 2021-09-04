<template>
  <div class="playing-page">
    <img :src="songImage + '?param=200y200'" class="background-image" />
    <c-scrollbar height="100%">
      <div class="playing-page-content">
        <div class="top flex space-between">
          <div class="cd-position">
            <div
              class="cd"
              :class="{
                'cd-rotate-paused': !playingState,
              }"
            >
              <div class="cd-background"></div>
              <img
                class="cd-image"
                :src="songImage + '?param=100y100'"
                alt=""
              />
            </div>
          </div>
          <div class="lyric-container">
            <h1 class="song-title text-center" style="margin-top: 0">
              {{ songName }}
            </h1>
            <div class="song-artist text-center">{{ songArtist }}</div>
            <c-scrollbar height="500px" trigger="none">
              <div class="lyric-content">
                <p
                  class="lyric-line"
                  v-for="(item, index) in lyric"
                  :key="index"
                >
                  {{ item.l }}
                </p>
              </div>
            </c-scrollbar>
          </div>
          <div class="recommend-pos">
            <div class="recommend">
              <div class="similar-song flex-direc-col row-gap-10">
                <h4 style="margin-bottom: 0">相似音乐</h4>
                <div
                  class="similar-song-item flex col-gap-10 align-center pointer"
                  v-for="(item, index) in simiSongs"
                  :key="index"
                  @click="setCurrentSong(item)"
                >
                  <the-image
                    width="50px"
                    height="50px"
                    :src="item.image + '?param=60y60'"
                  ></the-image>
                  <div class="similar-song-info">{{ item.name }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="comment">
          dsfljsdjflasjdfljasljdf
        </div>
      </div>
    </c-scrollbar>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { ref, computed, watchEffect, inject } from "vue";

import Song from "@/model/Song.js";
import api from "@/api/index.js";

const store = useStore();

const lyric = ref([]);
const simiSongs = ref([]);

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

const setCurrentSong = (song) => store.commit("setCurrentSong", song);

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
      }
    });

    api.song.getSimi(currentSong.value.id).then((response) => {
      if (response.code === 200) {
        simiSongs.value = response.songs.map((item) => new Song(item));
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

.playing-page {
}
.background-image {
  display: block;
  position: absolute;
  width: 100%;
  height: 50%;
  filter: blur(280px);
  z-index: -1;
}
.playing-page-content {
  margin-top: calc(var(--header-height) + 20px);
  margin-left: auto;
  margin-right: auto;
  max-width: 1100px;
}
.cd-position {
  position: relative;
  width: 300px;
  flex-shrink: 0;
}
.cd {
  position: absolute;
  top: 10%;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.08);
  animation: cdRotate 20s linear infinite;
}
.cd-rotate-paused {
  animation-play-state: paused;
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
  min-width: 400px;
  margin: 0 50px 0 15px;
  height: 600px;
  overflow: hidden;
}
.lyric-content {
  width: 100%;
  position: relative;
  top: 160px;
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
.recommend-pos {
  position: relative;
  width: 300px;
  flex-shrink: 0;
}
.recommend {
  position: absolute;
  top: 10%;
}
</style>
