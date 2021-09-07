<template>
  <the-section title="最新音乐" cols="3">
    <template #cards>
      <card-song v-for="(item, index) in songs" :key="index" :song="item" />
    </template>
  </the-section>
</template>

<script setup>
import TheSection from "@/components/TheSection.vue";
import CardSong from "./CardSong.vue";
import Song from "@/model/Song";
import api from "@/api/index.js";
import { ref } from "vue"

const songs = ref([]);

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
        songs.value = response.songs.map((item) => new Song(item));
      }
    });
  });
</script>