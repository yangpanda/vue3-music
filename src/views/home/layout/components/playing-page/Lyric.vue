<template>
  <div :class="$style.lyricWrap">
    <n-scrollbar>
      <div :class="$style.lyric">
        <p v-for="(item, index) in lyric" :key="index">{{ item.l }}</p>
      </div>
    </n-scrollbar>
  </div>
</template>

<script setup>
import { mapState } from "@/lib/lib.js";
import api from "@/api/index.js";
import { ref, computed, watchEffect } from "vue";
import { NScrollbar } from 'naive-ui'

const { currentSong } = mapState()
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

<style module>
.lyricWrap {
  height: 100%;
  overflow: hidden;
  min-width: 400px;
}
.lyric {
  text-align: center;
}
</style>