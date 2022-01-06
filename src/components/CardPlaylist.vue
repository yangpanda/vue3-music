<template>
  <card-base :title="playlist.name" @click="toPlaylistDetail(playlist.id)">
    <div :class="$style.imageBox">
      <the-image :src="playlist.imgUrl + '?param=400y400'" round="large" />
      <svg-button
        :class="$style.btnPlay"
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
import Playlist from '../model/Playlist';
import useRouterMethods from '../composables/useRouterMethods';
import usePlaylistMethods from '../composables/playlist-methods';
import CardBase from '@/components/CardBase.vue';

export default {
  name: 'CardPlaylist',
  components: {
    CardBase,
  },
  props: {
    playlist: new Playlist(),
  },
  setup() {
    const { toPlaylistDetail } = useRouterMethods();
    const { playAll } = usePlaylistMethods();

    return {
      toPlaylistDetail,
      playAll,
    };
  },
};
</script>

<style module>
.imageBox {
  position: relative;
  cursor: pointer;
}
.btnPlay {
  position: absolute;
  right: 1.2rem;
  bottom: 1.2rem;
  opacity: 0;
  transition-property: opacity;
  transition-duration: 500ms;
}
.imageBox:hover .btnPlay {
  opacity: 100;
}
</style>
