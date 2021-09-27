<template>
  <the-section title="最新音乐" cols="3">
    <template #cards v-if="loading">
      <skeleton class="flex gap-x-1" v-for="index in 15">
        <div class="w-12 h-12 bg-gray-200 rounded"></div>
        <div class="flex flex-col justify-end flex-grow gap-y-1">
          <div class="w-1/2 h-4 bg-gray-200 rounded"></div>
          <div class="w-3/4 h-4 bg-gray-200 rounded"></div>
        </div>
      </skeleton>
    </template>
    <template #cards v-else>
      <card-song v-for="(item, index) in songs" :key="index" :song="item" />
    </template>
  </the-section>
</template>

<script setup>
import TheSection from "@/components/TheSection.vue";
import CardSong from "./CardSong.vue";
import Song from "@/model/Song";
import api from "@/api/index.js";
import { ref, watch } from "vue"
import { mapState } from '@/lib/lib.js'

const songs = ref([]);
const loading = ref(true)
const { logined } = mapState()

watch(
  () => songs.value,
  () => loading.value = false
)

api.song
  .getNewSongs(15)
  .then((response) => {
    if (response.code === 200) {
      const songsId = response.result.map((item) => item.id);
      return songsId;
    }
  })
  .then((songsId) => {
    api.song.getSongDetail(songsId.join(",")).then((response) => {
      if (response.code === 200) {
        // songs.value = response.songs.map((item) => new Song(item));
        songs.value = response.songs;
      }
    });
  });
</script>