<template>
  <the-section title="推荐歌单" cols="5">
    <template #cards v-if="!ready">
      <div class="space-y-2 animate-pulse" v-for="n in 10" :key="n">
        <div class="bg-gray-200 rounded-lg" style="padding-top: 100%;"></div>
        <div class="bg-gray-200 w-1/2 h-4 rounded"></div>
      </div>
    </template>
    <template #cards v-else>
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
import { ref, watch, onMounted } from 'vue'

const playlists = ref([])
const ready = ref(false)

onMounted(() => {
  api.playlist.getPersonalized(10).then(response => {
    if (response.code === 200) {
        playlists.value = response.result.map(item => new Playlist(item))
    }
  })
})

watch(
  () => playlists.value,
  () =>  {
    ready.value = true
  }
)
</script>