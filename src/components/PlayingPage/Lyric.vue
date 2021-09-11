<template>
  <div class="h-full overflow-hidden space-y-10">
    <div class="space-y-2">
      <h1 class="text-2xl text-center">{{ songName }}</h1>
      <div class="text-sm text-center">{{ songArtist }}</div>
    </div>
    <scroll-bar>
      <div class="text-center space-y-5">
        <p class v-for="(item, index) in lyric" :key="index">{{ item.l }}</p>
      </div>
    </scroll-bar>
  </div>
</template>

<script setup>
import { mapState } from "@/lib/lib.js";
import api from "@/api/index.js";
import { ref, computed, watchEffect } from "vue";

const { currentSong } = mapState()

const songName = computed(() =>
  currentSong.value ? currentSong.value.name : ""
);
const songArtist = computed(() =>
  currentSong.value ? currentSong.value.singer.join(" / ") : ""
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
            l = " ";
          }

          return {
            t,
            l,
          };
        });
      }
    });
  }
});
</script>

<style scoped>
</style>