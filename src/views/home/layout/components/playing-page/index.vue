<template>
  <div ref="container" :class="$style.playingPage">
    <n-scrollbar ref="scrollbar">
      <div :class="$style.top">
        <div :class="$style.songInfo">
          <h1>{{ songName }}</h1>
          <div class>{{ songArtist }}</div>
        </div>
        <div :class="$style.topContent">
          <rotate-cd :src="songImage" :running="playingState" />
          <lyric />
          <div :class="$style.similarSong">
            <div :class="$style.similarSongBox">
              <h3>相似音乐</h3>
              <div
                :class="$style.similarSongItem"
                v-for="(item, index) in simiSongs"
                :key="index"
                @click="setCurrentSong(item)"
              >
                <the-image size="50" :src="item.image + '?param=60y60'" round="normal" />
                <div class="ellipsis">{{ item.name }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="playing-page__comment">
        <comment class="w-4/5 mx-auto" :comments="comments" />
      </div>
      <n-back-top v-if="scrollbar && container" right="20" bottom="20" :to="container"></n-back-top>
    </n-scrollbar>
  </div>
</template>

<script setup>
import { mapState, mapMutations } from "@/lib/lib.js"
import { ref, computed, watch } from "vue";

import Song from "@/model/Song.js";
import api from "@/api/index.js";

import RotateCd from "./RotateCd.vue";
import Lyric from "./Lyric.vue";
import Comment from "@/components/Comment.vue";
import { NScrollbar, NBackTop } from 'naive-ui'

const simiSongs = ref([]);
const comments = ref([]);
const hotComments = ref([]);
const scrollbar = ref(null)
const container = ref(null)

const {
  currentSong,
  playingState,
} = mapState()

const {
  setCurrentSong
} = mapMutations()

const songImage = computed(() =>
  currentSong.value ? currentSong.value.image : ""
);
const songName = computed(() =>
  currentSong.value ? currentSong.value.name : ""
);
const songArtist = computed(() =>
  currentSong.value ? currentSong.value.singer : []
);

watch(
  () => currentSong.value,
  () => {
    api.song.getSimi(currentSong.value.id).then((response) => {
      if (response.code === 200) {
        simiSongs.value = response.songs.map((item) => new Song(item));
      }
    });

    api.comment
      .ofSong({
        id: currentSong.value.id,
        limit: 20,
      })
      .then((response) => {
        if (response.code === 200) {
          hotComments.value = response.hotComments;
          comments.value = response.comments;
        }
      });
  });
</script>

<style module>
.playingPage {
  position: relative;
  width: 100%;
  height: 100%;
  /* 改变 fixed 上下文 */
  transform: translate(0);
}
.songInfo {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}
.topContent {
  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: 2rem;
  max-width: 150rem;
  height: 60rem;
  padding: 0 2rem 2rem 2rem;
  margin: 0 auto;
}
.similarSong {
  min-width: 300px;
}
.similarSongBox {
  display: flex;
  flex-direction: column;
  row-gap: var(--gap-sm);
}
.similarSongItem {
  display: flex;
  align-items: center;
  column-gap: var(--gap-sm);
  cursor: pointer;
}
</style>