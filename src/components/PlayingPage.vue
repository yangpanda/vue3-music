<template>
  <div class="playing-page">
    <div class="wrapper">
      <div class="top flex space-between">
        <img :src="songImage" class="background-image" />
        <div class="cd">
          <div class="background"></div>
          <img class="image" :src="songImage" alt="" />
        </div>
        <div class="lyric-container">
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
import { ref, computed, watchEffect, inject, onMounted } from "vue";

import api from "@/api/index.js";

const currentTime = inject('currentTime')
watchEffect(() => {
  console.log(currentTime)
})

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
    position: relative;
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
.background-image {
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  filter: blur(1000px);
  z-index: -1;
}

.lyric-container {
  max-width: 600px;
  height: 600px;
  overflow: hidden;
}
.lyric-content {
  width: 100%;
  position: relative;
  top: 300px
}
.lyric-line {
  white-space: pre-wrap;
  font-size: 15px;
  text-align: center;
  color: rgb(117, 116, 116);
}
.lyric-line-active {
  font-size: 16px;
  font-weight: bold;
  color: black;
}
.recommend {
  width: 200px;
  height: 200px;
}
</style>
