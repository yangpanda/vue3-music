<template>
  <div ref="container" class="relative h-full w-full z-0">
    <n-scrollbar ref="scrollbar">
      <div class="relative lg:w-full xl:w-3/5 mx-auto py-5 px-5 space-y-10">
        <div class="h-14 space-y-2">
          <div class="text-2xl font-medium text-center">{{ songName }}</div>
          <div class="text-center">{{ songArtist }}</div>
        </div>
        <div class="flex items-center justify-between" style="height: 560px;">
          <rotate-cd class="w-72 h-72 flex-shrink-0" :src="songImage" :running="playingState" />
          <lyric />
          <div class="flex-shrink-0 w-64">
            <div class="flex flex-col row-gap-10">
              <div class="text-lg">相似音乐</div>
              <div
                class="flex col-gap-10 items-center cursor-pointer"
                v-for="(item, index) in simiSongs"
                :key="index"
                @click="setCurrentSong(item)"
              >
                <the-image size="50" :src="item.image + '?param=60y60'" round="normal" />
                <div>{{ item.name }}</div>
              </div>
            </div>
          </div>
        </div>
        <comment class="w-4/5 mx-auto" :comments="comments" />
      </div>
      <n-back-top v-if="scrollbar && container" right="20" bottom="100" :to="container"></n-back-top>
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
  currentSong.value ? currentSong.value.singer.join(" / ") : ""
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