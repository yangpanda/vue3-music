<template>
  <card-base :title="playList.name" @click="toPlaylistDetail(playList.id)">
    <div :class="$style.imageBox">
      <the-image :src="playList.picUrl" round="large" />
      <div :class="$style.iconBox">
        <the-icon
          :class="$style.playIcon"
          name="play-triangle"
          color="#ec4141"
          size="28"
          @click.stop="playAll"
        />
      </div>
    </div>
  </card-base>
</template>

<script>
export default {
  name: 'CardPlaylist',
};
</script>

<script setup>
import CardBase from '@/components/CardBase.vue';
import api from '@/api/index.js';
import { chunk } from 'lodash';
import Song from '@/model/Song.js';
import { useMapMutations, useRouterMethods } from '@/composables';

const props = defineProps({
  playList: {},
});

const { toPlaylistDetail } = useRouterMethods();
const { setPlayList, play } = useMapMutations('player');

const playAll = async () => {
  const detail = await api.playlist.getDetail(props.playList.id);
  const trackIds = detail.trackIds.map((item) => item.id);
  const trackIdChunks = chunk(trackIds, 300);
  const songs = [];

  const getSongsDetail = async (i = 0) => {
    const res = await api.song.getDetail(trackIdChunks[i].join(','));
    songs.push(...res.map((item) => new Song(item)));

    if (++i < trackIdChunks.length) {
      await getSongsDetail(i);
    }
  };

  await getSongsDetail();
  setPlayList(songs);
  play(0);
};
</script>

<style module>
.imageBox {
  position: relative;
  cursor: pointer;
}
.iconBox {
  position: absolute;
  right: 1.2rem;
  bottom: 1.2rem;
  opacity: 0;
  transition-property: opacity;
  transition-duration: 500ms;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.6);
  box-shadow: 0 2px 8px 0px rgba(0, 0, 0, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
}
.imageBox:hover .iconBox {
  opacity: 100;
}
.playIcon {
  margin-left: 2px;
}
</style>
