<template>
  <blur-background
    class="fixed left-0 top-0 bottom-20 right-0 border-b"
    :src="songImage"
  >
    <div class="lg:w-full xl:w-3/5 mx-auto py-5 px-5">
      <div class="flex items-center justify-between">
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
              <the-image
                size="50"
                :src="item.image + '?param=60y60'"
                round="normal"
              />
              <div>{{ item.name }}</div>
            </div>
          </div>
        </div>
      </div>
      <comment class="w-4/5 mx-auto" :comments="comments" />
    </div>
  </blur-background>
</template>

<script setup>
import { mapState, mapMutations } from "@/lib/lib.js"
import { ref, computed, watchEffect } from "vue";

import Song from "@/model/Song.js";
import api from "@/api/index.js";

import BlurBackground from "./BlurBackground.vue";
import RotateCd from "./RotateCd.vue";
import Lyric from "./Lyric.vue";
import Comment from "@/components/Comment.vue";

const simiSongs = ref([]);
const comments = ref([]);
const hotComments = ref([]);

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

watchEffect(() => {
  if (currentSong.value) {
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
  }
});
</script>

<style scoped>
</style>
