<template>
  <div :class="$style.topSong">
    <div :class="$style.nav">
      <div :class="$style.navLeft">
        <span
          :class="[$style.navItem, type == value ? $style.active : '']"
          v-for="(value, name) in Object.fromEntries(typeMap)"
          @click="type = value"
        >
          {{ name }}
        </span>
      </div>
      <n-button>播放全部</n-button>
    </div>
    <div>
      <div :class="$style.songItem" v-for="(item, index) in songs" :key="item.id">
        <div :class="[$style.Index]">{{ index + 1 }}</div>
        <div :class="[$style.coverBox, 'cursor-pointer']" @click="play(item)">
          <the-image :src="item.album.picUrl + '?param=160y160'" size="60" round="normal" />
          <the-icon :class="$style.btnPlay" name="play-triangle" color="#ec4141" />
        </div>
        <div class="ellipsis">{{ item.name }}</div>
        <div class="ellipsis">
          <the-link
            :class="$style.artistLink"
            v-for="artist in item.singer"
            :to="{ name: 'ArtistDetail', params: { id: artist.id } }"
            >{{ artist.name }}</the-link
          >
        </div>
        <div class="ellipsis">
          <the-link :to="{ name: 'AlbumDetail', params: { id: item.album.id } }">{{
            item.album.name
          }}</the-link>
        </div>
        <div :class="$style.duration">{{ item.duration }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { NButton } from 'naive-ui';
import { ref, watchEffect } from '@vue/runtime-core';
import api from '@/api/index.js';
import { mapMutations } from '@/lib/lib.js';
import Song from '@/model/Song.js';

const typeMap = new Map([
  ['全部', 0],
  ['华语', 7],
  ['欧美', 96],
  ['日本', 8],
  ['韩国', 16],
]);

export default {
  name: 'TopSong',
  components: {
    NButton,
  },
  setup() {
    const type = ref(0);
    const songs = ref([]);
    const { setCurrentSong, insertSong, setPlayingState } = mapMutations();

    const getTopSong = async (params) => {
      const res = await api.song.getTopSong(params);
      if (res.code === 200) {
        songs.value = res.data.map((item) => new Song(item));
      }
    };

    function play(song) {
      setCurrentSong(song);
      insertSong(song);
      setPlayingState(true);
    }

    watchEffect(() => {
      getTopSong({
        type: type.value,
      });
    });

    return {
      type,
      songs,
      typeMap,
      play,
    };
  },
};
</script>

<style module>
.topSong {
  width: 100%;
}
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.navLeft {
  display: flex;
  column-gap: var(--gap-lg);
}
.navItem {
  cursor: pointer;
}
.navItem.active {
  color: #18a058;
}
.navItem:hover {
  color: #18a058;
}
.songItem {
  display: grid;
  grid-template-columns: 30px 60px 1.2fr 2fr 1fr 40px;
  column-gap: 15px;
  padding: 10px 10px 10px 5px;
  align-items: center;
  justify-content: space-between;
}
.songItem:nth-of-type(odd) {
  background-color: #f9f9f9;
}
.Index {
  text-align: end;
}
.coverBox {
  position: relative;
  flex-shrink: 0;
}
.btnPlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}
.duration {
  text-align: end;
}
.artistLink:not(:first-child)::before {
  content: '';
  border: 1px solid rgba(0, 0, 0, 0.2);
  margin: 0 10px;
}
</style>
