<template>
  <div class="new-song-nav">
    <div class="new-song-nav-left">
      <n-button
        text
        class="new-song-type pointer"
        v-for="(type, name) in Object.fromEntries(songTypeMap)"
        :key="type"
        @click="songType = type"
      >
        {{ name }}
      </n-button>
    </div>
    <n-button-group>
      <n-button>
        <template #icon>
          <n-icon>
            <play-icon />
          </n-icon>
        </template>
        播放全部
      </n-button>
      <n-button>
        <template #icon>
          <n-icon>
            <sub-icon />
          </n-icon>
        </template>
        收藏全部
      </n-button>
    </n-button-group>
  </div>
  <div class="song-list">
    <div class="song-item" v-for="(item, index) in newSongs" :key="index">
      <div class="song-index">{{ index + 1 }}</div>
      <div class="song-img pointer" @click="play(new Song(item))">
        <the-image
          :src="item.album.picUrl + '?param=160y160'"
          size="60"
          round="normal"
        />
        <svg-icon
          class="play-button"
          iconName="#icon-play-triangle"
          iconColor="#ec4141"
          size="30"
        />
      </div>
      <div class="song-name ellipsis">{{ item.name }}</div>
      <div class="song-singer ellipsis">
        {{ generateArtists(item.artists) }}
      </div>
      <div class="song-album ellipsis">{{ item.album.name }}</div>
      <div class="song-duration">{{ formatDuration(item.duration) }}</div>
    </div>
  </div>
</template>

<script setup>
import {
  NButtonGroup,
  NButton,
  NIcon,
  useLoadingBar,
} from "naive-ui";
import { PlayCircleOutlineRound as PlayIcon } from "@vicons/material";
import { FolderPlus as SubIcon } from "@vicons/tabler";

import { formatDuration } from "@/utils/index.js";

import * as song from "@/api/service/song.js";
import { ref, watchEffect, reactive } from "@vue/runtime-core";
import { mapMutations } from "@/lib/lib.js";

import Song from "@/model/Song.js";

const loadingBar = useLoadingBar();

const songTypeMap = new Map([
  ["全部", 0],
  ["华语", 7],
  ["欧美", 96],
  ["日本", 8],
  ["韩国", 16],
]);

const { setCurrentSong, insertSong } = mapMutations()

const songType = ref(0);
const newSongs = ref([]);

const getTopSong = async (params) => {
  loadingBar.start();
  song.getTopSong(params).then((res) => {
    if (res.code === 200) {
      newSongs.value = res.data;
      loadingBar.finish();
    }
  });
};

watchEffect(() => {
  getTopSong({
    type: songType.value,
  });
});

function generateArtists(artists) {
  return artists.map((item) => item.name).join(" / ");
}

function play(song) {
  setCurrentSong(song);
  insertSong(song);
}
</script>

<style scoped>
.new-song-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.new-song-nav-left {
  display: flex;
  column-gap: 20px;
}
.song-item {
  display: flex;
  column-gap: 15px;
  padding: 10px 10px 10px 5px;
  align-items: center;
  justify-content: space-between;
}
.song-item:nth-of-type(odd) {
  background-color: #f9f9f9;
}
.song-index {
  flex-basis: 30px;
  text-align: end;
}
.song-img {
  flex-shrink: 0;
  flex-basis: 60px;
  position: relative;
}
.play-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}
.song-name {
  flex-basis: 150px;
  flex-grow: 1;
}
.song-singer {
  flex-grow: 1;
  flex-basis: 100px;
}
.song-album {
  flex-grow: 1;
  flex-basis: 100px;
}
.song-duration {
  flex-basis: 40px;
  text-align: end;
}
</style>
