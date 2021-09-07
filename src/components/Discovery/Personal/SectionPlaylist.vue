<template>
  <the-section title="推荐歌单" cols="5">
    <template #cards>
      <card-playlist
        v-for="(item, index) in playlists"
        :key="index"
        :playlist="item"
      />
    </template>
  </the-section>
</template>

<script setup>
import TheSection from "@/components/TheSection.vue";
import CardPlaylist from '@/components/CardPlaylist.vue'
import Playlist from "@/model/Playlist";
import api from "@/api/index.js"
import { ref } from 'vue'

const playlists = ref([])

api.playlist.getPersonalized(10).then(response => {
    if (response.code === 200) {
        playlists.value = response.result.map(item => new Playlist(item))
    }
})
</script>