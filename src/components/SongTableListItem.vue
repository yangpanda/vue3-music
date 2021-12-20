<template>
  <div :class="$style.songListItem" @dblclick="play(index)">
    <div :class="$style.front">
      <span :class="$style.index">{{ formatIndex(index + 1) }}</span>
      <div :class="$style.btn">
        <svg-icon v-if="!isLiked(song.id)" name="love" size="20" color="#909399" />
        <svg-icon v-else name="love-selected" size="20" color="#ec4141" />
      </div>
    </div>
    <div :class="[$style.title, 'ellipsis']">{{ song.name }}</div>
    <div :class="['ellipsis', $style.artistBox]">
      <a
        :class="$style.artist"
        v-for="(artist, index) in song.singer"
        :key="index"
        @click="toArtistDetail(artist.id)"
        >{{ artist.name }}</a
      >
    </div>
    <div :class="[$style.album, 'ellipsis']" @click="toAlbumDetail(song.album.id)">{{ song.album.name }}</div>
    <div>{{ song.duration }}</div>
  </div>
</template>

<script>
import * as utils from '@/utils/index.js';
import { mapMutations } from '@/lib/lib.js';
import useRouterMethods from '@/composables/router-methods';

export default {
  name: 'SongTableListItem',
  props: {
    song: {
      type: Object,
    },
    index: {
      type: Number,
    },
    inLove: false,
  },
  emits: ['play'],
  setup(props, { emit }) {
    const { setCurrentSong, setPlayIndex, setPlayingState } = mapMutations();
    const { toArtistDetail, toAlbumDetail } = useRouterMethods();

    const play = () => {
      setCurrentSong(props.song);
      setPlayIndex(props.index);
      setPlayingState(true);
      emit('play');
    };
    return {
      play,
      toArtistDetail,
      toAlbumDetail,
    };
  },
  methods: {
    formatIndex(num) {
      return utils.formatNumber(num);
    },
    isLiked(id) {
      const likedSongs = this.$store.state.likedSongs;
      return likedSongs ? likedSongs.has(id) : false;
    },
  },
};
</script>

<style module>
.songListItem {
  height: 4rem;
  display: grid;
  grid-template-columns: 8rem 3fr 2fr 2fr 60px;
  align-items: center;
  column-gap: var(--gap-lg);
  padding: 0 2rem;
  cursor: default;
  color: rgba(120, 120, 120, 1);
}
.songListItem:nth-of-type(odd) {
  background-color: rgba(220, 220, 220, 0.4);
}
.songListItem:hover {
  background-color: rgba(230, 230, 230, 1);
}
.front {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.index {
  width: 3.2rem;
  text-align: center;
}

.title {
  color: #18191c;
}
.btn {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.artistBox {
  display: flex;
  align-items: center;
}
.artist {
  cursor: pointer;
}
.artist:hover {
  color: #18191c;
}
.artist:not(:first-child):before {
  content: '|';
  padding: 0 var(--gap-sm);
}
.album {
  cursor: pointer;
}
.album:hover {
  color: #18191c;
}
</style>
