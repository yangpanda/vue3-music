<template>
  <swipper :banners="banners"></swipper>
  <the-section title="推荐歌单" cols="5">
    <template #cards>
      <card-playlist
        v-for="(item, index) in personalizedPlaylists"
        :key="index"
        :playlist="item"
      />
    </template>
  </the-section>
  <the-section title="独家放送" cols="3">
    <template #cards>
      <card-private-content
        v-for="(item, index) in privateContents"
        :key="index"
        :privateContent="item"
      />
    </template>
  </the-section>
  <the-section title="最新音乐" cols="3">
    <template #cards>
      <card-song
        v-for="(item, index) in newSongs"
        :key="index"
        :song="item"
      />
    </template>
  </the-section>
  <the-section title="推荐MV" cols="3">
    <template #cards>
      <card-mv
        v-for="(item, index) in personalizedMvs"
        :key="index"
        :mv="item"
      />
    </template>
  </the-section>
</template>

<script setup>
import Swipper from "@/components/Swipper.vue";
import TheSection from "@/components/TheSection.vue";
import CardPlaylist from "@/components/CardPlaylist.vue";
import CardPrivateContent from "@/components/CardPrivateContent.vue";
import CardSong from "@/components/CardSong.vue";
import CardMv from "@/components/CardMv.vue";

import { useLoadingBar } from "naive-ui";

import Playlist from "@/model/Playlist";
import Song from "@/model/Song";

import api from '@/api/index.js'

import { ref, onMounted } from "vue";
import axios from 'axios'

const loadingBar = useLoadingBar();

const banners = ref([])
const privateContents = ref([]);
const personalizedMvs = ref([]);
const newSongs = ref([]);
const personalizedPlaylists = ref([]);

const getNewSongs = async () => {
  const songs = await api.song.getNewSongs(15)
  const songsId = songs.result.map(item => item.id)
  return api.song.getSongDetail(songsId.join(','))
};

onMounted(() => {
  loadingBar.start()
  axios.all([
    api.banner.getBanners(2),
    api.playlist.getPersonalized(10),
    api.mv.getPrivatecontent(3),
    api.mv.getPersonalizedMv(),
    getNewSongs(),
  ]).then(axios.spread((bann, pers, privCont, persMv, songs) => {
    banners.value = bann.banners

    if (pers.code === 200) {
      personalizedPlaylists.value = pers.result.map(
        item => new Playlist(item)
      );
    }

    if (privCont.code === 200) {
      privateContents.value = privCont.result;
    }

    personalizedMvs.value = persMv.result.slice(0, 3);

    newSongs.value = songs.songs.map(item => new Song(item))

    loadingBar.finish()
  }))
});
</script>

<style scoped>
</style>
