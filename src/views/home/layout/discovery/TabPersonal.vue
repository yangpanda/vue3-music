<template>
  <div :class="$style.personalWrap">
    <the-swiper :banners="banners" />
    <the-section title="推荐歌单" cols="5" :page="{ name: 'Playlist' }">
      <template #cards>
        <card-playlist v-for="(item, index) in playlists" :key="index" :playlist="item" />
      </template>
    </the-section>
    <the-section title="独家放送" cols="3">
      <template #cards>
        <card-base v-for="item in privateContents" :title="item.name">
          <the-image :src="item.sPicUrl" ratio="16 / 9" round="middle" />
        </card-base>
      </template>
    </the-section>
    <the-section title="最新音乐" cols="3" :page="{ name: 'Newsong' }">
      <template #cards>
        <card-song v-for="song in songs" :song="song"></card-song>
      </template>
    </the-section>
    <the-section title="推荐MV" cols="3">
      <template #cards>
        <card-mv v-for="(item, index) in mvs" :key="index" :mv="item" />
      </template>
    </the-section>
  </div>
</template>

<script>
import TheSwiper from '@/components/TheSwiper.vue';
import TheSection from '@/components/TheSection.vue';
import CardPlaylist from '@/components/CardPlaylist.vue';
import CardMv from '@/components/CardMv.vue';
import CardBase from '@/components/CardBase.vue';
import CardSong from './components/CardSong.vue';

import Playlist from '@/model/Playlist';
import api from '@/api/index.js';
import { onMounted, reactive, toRefs } from 'vue';

export default {
  components: {
    TheSwiper,
    TheSection,
    CardPlaylist,
    CardMv,
    CardBase,
    CardSong,
  },
  setup() {
    const state = reactive({
      banners: [],
      playlists: [],
      privateContents: [],
      songs: [],
      mvs: [],
    });

    const getBanners = () => {
      api.banner.getBanners(2).then((response) => {
        if (response.code === 200) {
          state.banners = response.banners;
        }
      });
    };

    const getPrivateContents = () => {
      api.mv.getPrivatecontent(3).then((response) => {
        if (response.code === 200) {
          state.privateContents = response.result;
        }
      });
    };

    const getPlaylists = () => {
      api.playlist.getPersonalized(10).then((response) => {
        if (response.code === 200) {
          state.playlists = response.result.map((item) => new Playlist(item));
        }
      });
    };

    const getSongs = () => {
      api.song
        .getNewSongs(15)
        .then((response) => {
          if (response.code === 200) {
            const songsId = response.result.map((item) => item.id);
            return songsId;
          }
        })
        .then((songsId) => {
          api.song.getSongDetail(songsId.join(',')).then((response) => {
            if (response.code === 200) {
              state.songs = response.songs;
            }
          });
        });
    };

    const getMvs = () => {
      api.mv.getPersonalized().then((response) => {
        if (response.code === 200) {
          state.mvs = response.result.slice(0, 3);
        }
      });
    };

    onMounted(() => {
      getBanners();
      getPrivateContents();
      getPlaylists();
      getSongs();
      getMvs();
    });

    return {
      ...toRefs(state),
    };
  },
};
</script>

<style module>
.personalWrap {
  display: flex;
  flex-direction: column;
  row-gap: 2rem;
}
</style>
