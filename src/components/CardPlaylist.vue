<template>
  <card-base :title="title()" @click="routeToDetail()">
    <div class="relative z-0 group">
      <div
        class="
          absolute
          right-3
          bottom-3
          z-10
          flex
          justify-center
          items-center
          w-9
          h-9
          bg-white
          rounded-full
          opacity-0
          group-hover:opacity-100
          transition-opacity
          duration-500
          cursor-pointer
        "
        @click.stop="play()"
      >
        <svg-icon
          class="transform translate-x-0.5"
          iconName="#icon-play-triangle"
          iconColor="#ec4141"
          size="24"
        />
      </div>
      <the-image
        class="cursor-pointer"
        :src="picSrc() + '?param=400y400'"
        round="large"
      />
    </div>
  </card-base>
</template>

<script setup>
import CardBase from "@/components/CardBase.vue";
import { useRouter } from 'vue-router'
import { mapMutations, mapState } from '@/lib/lib.js'

import { getSongDetail, getPlaylistDetail } from "@/composables/usePlaylist";

const props = defineProps({
  playlist: Object,
});

const router = useRouter()
const { setPlaylist, setCurrentSong, setPlayingState } = mapMutations()
const { playlist } = mapState()

function routeToDetail() {
  router.push(`/playlist-detail/${props.playlist.id}`);
}

async function play() {
  const ids = [];
  const playlistDetail = await getPlaylistDetail(props.playlist.id);
  playlistDetail.trackIds.map((item) => ids.push(item.id));

  const songs = await getSongDetail(ids);
  setPlaylist(songs)
  setCurrentSong(playlist.value[0])
  setPlayingState(true)
}

function picSrc() {
  return props.playlist.imgUrl
}

function title() {
  return props.playlist.name
}
</script>