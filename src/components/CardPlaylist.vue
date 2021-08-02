<template>
  <card-base
    class="card"
    :title="playlist.name"
    @click="toPlaylist(playlist.id)"
  >
    <template #image>
      <div
        class="wrapper"
        @mouseenter="showPlayBtn = !showPlayBtn"
        @mouseleave="showPlayBtn = !showPlayBtn"
      >
        <transition name="fade">
          <div
            class="icon-container shadow"
            v-if="showPlayBtn"
            @click="playAll()"
          >
            <svg-icon
              class="icon-play"
              iconName="#icon-play-triangle"
              iconColor="#ec4141"
              size="24"
              @click.stop="playAll"
            />
          </div>
        </transition>
        <the-image :src="playlist.imgUrl + '?param=400y400'" radius="8px" />
      </div>
    </template>
  </card-base>
</template>

<script>
import CardBase from "@/components/CardBase.vue";
import { getSongDetail, getPlaylistDetail } from "@/composables/usePlaylist";

export default {
  name: "CardPlaylist",
  components: {
    CardBase,
  },
  data() {
    return {
      showPlayBtn: false,
    };
  },
  props: {
    playlist: Object,
  },
  methods: {
    toPlaylist(id) {
      this.$router.push(`/playlist-detail/${id}`);
    },
    async playAll() {
      const ids = [];
      const playlistDetail = await getPlaylistDetail(this.playlist.id)
      playlistDetail.trackIds.map((item) => ids.push(item.id))

      const songs = await getSongDetail(ids)
      this.$store.state.playlists = songs;
      this.$store.state.currentSong = this.$store.state.playlists[0]
    },
  },
};
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.card {
  .wrapper {
    position: relative;

    .icon-container {
      position: absolute;
      bottom: 10px;
      right: 10px;
      z-index: 1;
      width: 36px;
      height: 36px;
      background-color: #fff;
      border-radius: 50%;

      .icon-play {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translateX(-40%) translateY(-50%);
      }
    }
  }
}
</style>
