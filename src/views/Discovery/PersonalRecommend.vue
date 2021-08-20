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
          v-for="(item, index) in privatecontents"
          :key="index"
          :privateContent="item"
        />
      </template>
    </the-section>
    <the-section label="最新音乐" columns="3">
      <template #cards>
        <card-song v-for="(item, index) in newsongs" :key="index" :song="item" />
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
import Banner from "@/components/Banner.vue";
import CardPlaylist from "@/components/CardPlaylist.vue";
import CardPrivateContent from "@/components/CardPrivateContent.vue";
import CardSong from "@/components/CardSong.vue";
import CardMv from "@/components/CardMv.vue";
import TheSection from "@/components/TheSection.vue";

import { usePlaylistPersonalized } from "@/composables/usePlaylist.js";
import { useMvPrivatecontent, useMvPersonalized } from "@/composables/useMv.js";
import { useSongNewsong } from "@/composables/useSong.js";

export default {
  components: {
    Banner,
    CardPlaylist,
    CardPrivateContent,
    CardMv,
    CardSong,
    TheSection
  },
  name: "PersonalRecommend",
  setup() {
    const { personalizedPlaylists } = usePlaylistPersonalized();
    const { privatecontents } = useMvPrivatecontent();
    const { newsongs } = useSongNewsong();
    const { personalizedMvs } = useMvPersonalized();

    return {
      personalizedPlaylists,
      privatecontents,
      newsongs,
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
