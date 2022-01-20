<template>
  <card-base :title="playList.name" @click="toPlaylistDetail(playList.id)">
    <div :class="$style.imageBox">
      <the-image :src="playList.picUrl" radius="8" />
      <div :class="$style.iconBox">
        <the-icon
          :class="$style.playIcon"
          name="play-triangle"
          color="#fff"
          size="32"
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
  transition-property: all;
  transition-duration: 500ms;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: hsla(0,0%,100%,.28);
  border: 1px solid hsla(0,0%,100%,.08);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
}
.iconBox:active {
  transform: scale(.8);
}
.imageBox:hover .iconBox {
  opacity: 100;
}
.playIcon {
  margin-left: 2px;
}
</style>
