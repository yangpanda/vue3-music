<template>
  <div :class="$style.cardSong">
    <div :class="$style.songCoverBox">
      <the-image :src="song.al.picUrl + '?param=50y50'" size="50" round="normal" />
      <the-icon :class="$style.btnPlay" name="play-triangle" color="#ec4141" @click="playSong(song)" />
    </div>
    <div :class="$style.songInfoBox">
      <div class="cursor-pointer ellipsis">{{ song.name }}</div>
      <div :class="[$style.songArtistBox, 'text-sm ellipsis']">
        <a class="cursor-pointer" v-for="artist in song.ar" @click="toArtistDetail(artist.id)">{{
          artist.name
        }}</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from '@/lib/lib';

export default {
  props: {
    song: {},
  },
  setup() {
    const { insertSong, setCurrentSong } = mapMutations();

    const playSong = (song) => {
      insertSong(song);
      setCurrentSong(song);
    };

    return {
      playSong,
    };
  },
};
</script>

<style module>
.cardSong {
  display: flex;
  align-items: center;
  column-gap: var(--gap-sm);
}
.songCoverBox {
  position: relative;
}
.btnPlay {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.songInfoBox {
  width: 0;
  height: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  row-gap: 0.4rem;
}
.songArtistBox {
  display: flex;
  column-gap: var(--gap-sm);
}
</style>
