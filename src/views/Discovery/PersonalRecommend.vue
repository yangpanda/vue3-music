<template>
  <div class="personal-recommend">
    <banner></banner>
    <the-section label="推荐歌单" columns="5">
      <template #cards>
        <card-playlist
          v-for="(item, index) in playlists"
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

<script>
import Banner from "components/Banner.vue";
import CardPlaylist from "components/CardPlaylist.vue";
import CardPrivateContent from "components/CardPrivateContent.vue";
import CardSong from "components/CardSong.vue";
import CardMv from "components/CardMv.vue";
import TheSection from "components/TheSection.vue";

import { ref, onMounted } from "vue";

import {
  fetchRecommendPlaylists,
  fetchPrivateContents,
  fetchNewSongs,
  fetchPersonalizedMvs,
} from "api/methods.js";

import Playlist from "model/Playlist.js";

export default {
  components: {
    Banner,
    CardPlaylist,
    CardPrivateContent,
    CardMv,
    CardSong,
    TheSection,
  },
  name: "PersonalRecommend",
  setup() {
    const playlists = ref([]);
    const privateContents = ref([]);
    const newSongs = ref([]);
    const personalizedMvs = ref([]);

    const getRecommendPlaylists = async () => {
      const res = await fetchRecommendPlaylists(10);
      res.result.forEach((playlist) => {
        playlists.value.push(new Playlist(playlist));
      });
    };

    const getPrivatecontents = async () => {
      const res = await fetchPrivateContents();
      res.result.forEach((item) => {
        privateContents.value.push(item);
      });
    };

    const getNewSongs = async () => {
      const res = await fetchNewSongs(15);
      res.result.forEach((item) => {
        newSongs.value.push(item);
      });
    };

    const getPersonalizedMvs = async () => {
      const res = await fetchPersonalizedMvs();
      res.result.forEach((item) => {
        personalizedMvs.value.push(item);
      });
      personalizedMvs.value = personalizedMvs.value.slice(0, 3);
    };

    onMounted(getRecommendPlaylists);
    onMounted(getPrivatecontents);
    onMounted(getNewSongs);
    onMounted(getPersonalizedMvs);

    return {
      playlists,
      privateContents,
      newSongs,
      personalizedMvs,
    };
  },
  methods: {
    toDailySongs() {
      this.$router.push("/dailysongs");
    },
  },
};
</script>

<style lang="scss" scoped>
.personal-recommend {
  display: grid;
  grid-row-gap: 20px;
}
</style>