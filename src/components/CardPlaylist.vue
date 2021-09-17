<template>
  <card-base :title="name()" @click="routeToDetail()">
    <div class="relative z-0 group">
      <div
        class="absolute right-3 bottom-3 z-10 flex justify-center items-center w-9 h-9 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 cursor-pointer"
        @click.stop="play()"
      >
        <svg-icon class="transform translate-x-0.5" name="play-triangle" color="#ec4141" size="24" />
      </div>
      <the-image class="cursor-pointer" :src="imgUrl() + '?param=400y400'" round="large" />
    </div>
  </card-base>
</template>

<script setup>
import api from "@/api/index.js";
import CardBase from "@/components/CardBase.vue";
import { useRouter } from 'vue-router'
import { mapMutations, mapState } from '@/lib/lib.js'

const router = useRouter()
const {
  setPlaylist,
  setCurrentSong,
  setPlayingState
} = mapMutations()
const {
  playlist
} = mapState()

const props = defineProps({
  playlist: Object,
});

const imgUrl = () => props.playlist.imgUrl
const name = () => props.playlist.name

function routeToDetail() {
  router.push(`/playlist-detail/${props.playlist.id}`);
}

// TODO: 歌曲数太多的情况
async function play() {
  const detail = await api.playlist.getPlaylistDetail(props.playlist.id)
  const songs = await api.song.getSongDetail(
    detail.trackIds.map(item => item.id).join(',')
  )

  setPlaylist(songs)
  setCurrentSong(playlist.value[0])
  setPlayingState(true)
}
</script>