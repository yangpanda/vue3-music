<template>
  <card-base :title="playlist.name" @click="toPlaylistDetail(playlist.id)">
    <div class="relative group">
      <the-image class="cursor-pointer" :src="playlist.imgUrl + '?param=400y400'" round="large" />
      <svg-button
        class="play-btn"
        name="play-triangle"
        color="#ec4141"
        :size="28"
        box
        triangle
        @click.stop="playAll(playlist.id)"
      />
    </div>
  </card-base>
</template>

<script>
import Playlist from "../model/Playlist";
import useRouterMethods from "../composables/router-methods";
import usePlaylistMethods from "../composables/playlist-methods";
import CardBase from "@/components/CardBase.vue";

export default {
  name: 'CardPlaylist',
  components: {
    CardBase
  },
  props: {
    playlist: new Playlist(),
  },
  setup() {
    const { toPlaylistDetail } = useRouterMethods()
    const { playAll } = usePlaylistMethods()

    return {
      toPlaylistDetail,
      playAll,
    }
  }
}

</script>

<style scoped lang="postcss">
.play-btn {
  @apply absolute right-3 bottom-3;
  @apply opacity-0 group-hover:opacity-100 transition-opacity duration-500 cursor-pointer;
}
</style>