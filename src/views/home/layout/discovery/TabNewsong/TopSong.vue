<template>
  <div :class="$style.topSong">
    <div :class="$style.nav">
      <div :class="$style.navLeft">
        <n-button
          text
          v-for="(type, name) in Object.fromEntries(songTypeMap)"
          :key="type"
          @click="songType = type"
          >{{ name }}</n-button
        >
      </div>
      <n-button-group>
        <n-button>播放全部</n-button>
        <n-button>收藏全部</n-button>
      </n-button-group>
    </div>
    <div>
      <div :class="$style.songItem" v-for="(item, index) in newSongs" :key="index">
        <div :class="[$style.Index]">{{ index + 1 }}</div>
        <div :class="[$style.coverBox, 'cursor-pointer']" @click="play(new Song(item))">
          <the-image :src="item.album.picUrl + '?param=160y160'" size="60" round="normal" />
          <svg-button :class="$style.btnPlay" name="play-triangle" box triangle color="#ec4141" />
        </div>
        <div class="ellipsis">{{ item.name }}</div>
        <div class="ellipsis">{{ generateArtists(item.artists) }}</div>
        <div class="ellipsis">{{ item.album.name }}</div>
        <div :class="[$style.duration]">{{ formatDuration(item.duration) }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { NButtonGroup, NButton, NIcon } from 'naive-ui';

import { formatDuration } from '@/utils/index.js';

import * as song from '@/api/service/song.js';
import { ref, watchEffect } from '@vue/runtime-core';
import { mapMutations } from '@/lib/lib.js';

import Song from '@/model/Song.js';

const songTypeMap = new Map([
  ['全部', 0],
  ['华语', 7],
  ['欧美', 96],
  ['日本', 8],
  ['韩国', 16],
]);

const { setCurrentSong, insertSong } = mapMutations();

const songType = ref(0);
const newSongs = ref([]);

const getTopSong = async (params) => {
  song.getTopSong(params).then((res) => {
    if (res.code === 200) {
      newSongs.value = res.data;
    }
  });
};

watchEffect(() => {
  getTopSong({
    type: songType.value,
  });
});

function generateArtists(artists) {
  return artists.map((item) => item.name).join(' / ');
}

function play(song) {
  setCurrentSong(song);
  insertSong(song);
}
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
.songItem {
  display: grid;
  grid-template-columns: 30px 60px 2fr 1fr 2fr 40px;
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
</style>
