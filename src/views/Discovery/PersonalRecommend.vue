<template>
  <div class="personal-recommend">
    <banner></banner>
    <the-section label="推荐歌单" columns="5">
      <template #cards>
        <card-playlist
          v-for="(item, index) in personalizedPlaylists"
          :key="index"
          :playlist="item"
        />
      </template>
    </the-section>
    <the-section label="独家放送" columns="3">
      <template #cards>
        <card-private-content
          v-for="(item, index) in privateContents"
          :key="index"
          :privateContent="item"
        />
      </template>
    </the-section>
    <the-section label="最新音乐" columns="3">
      <template #cards>
        <card-song
          v-for="(item, index) in newSongs"
          :key="index"
          :song="item"
        />
      </template>
    </the-section>
    <the-section label="推荐MV" columns="3">
      <template #cards>
        <card-mv
          v-for="(item, index) in personalizedMvs"
          :key="index"
          :mv="item"
        />
      </template>
    </the-section>
  </div>
</template>

<script setup>
import Banner from "@/components/Banner.vue";
import CardPlaylist from "@/components/CardPlaylist.vue";
import CardPrivateContent from "@/components/CardPrivateContent.vue";
import CardSong from "@/components/CardSong.vue";
import CardMv from "@/components/CardMv.vue";
import TheSection from "@/components/TheSection.vue";

import { useLoadingBar } from "naive-ui";

import Playlist from "@/model/Playlist";
import Song from "@/model/Song";

import * as playlist from "@/api/service/playlist.js";
import * as mv from "@/api/service/mv.js";
import * as song from "@/api/service/song.js";

import { ref, onMounted } from "vue";

const loading = useLoadingBar();
const privateContents = ref([]);
const personalizedMvs = ref([]);
const newSongs = ref([]);
const personalizedPlaylists = ref([]);

const getPersonalized = async () => {
  playlist.getPersonalized(10).then((res) => {
    if (res.code === 200) {
      personalizedPlaylists.value = res.result.map(
        (item) => new Playlist(item)
      );
    }
  });
};

const getPrivatecontent = async () => {
  mv.getPrivatecontent(3).then((res) => {
    if (res.code === 200) {
      privateContents.value = res.result;
    }
  });
};

const getPersonalizedMv = async () => {
  mv.getPersonalizedMv().then((res) => {
    personalizedMvs.value = res.result.slice(0, 3);
  });
};

const getNewSongs = async () => {
  song
    .getNewSongs(15)
    .then((res) => {
      if (res.code === 200) {
        const songsId = res.result.map((item) => item.id);
        return songsId;
      }
    })
    .then((res) => {
      song.getSongDetail(res.join(",")).then((res) => {
        if (res.code === 200) {
          newSongs.value = res.songs.map((item) => new Song(item));
        }
      });
    });
};

onMounted(async () => {
  loading.start();
  let s = await getPersonalized();
  console.log(s);
  await getPrivatecontent();
  await getNewSongs();
  await getPersonalizedMv();
  loading.finish();
});
</script>

<style lang="scss" scoped>
.personal-recommend {
  display: grid;
  grid-row-gap: 20px;
}
</style>
