<template>
  <div :class="$style.personal">
    <the-swiper :banners="banners" />
    <the-section title="推荐歌单" cols="5" :to="{ name: 'Playlist' }">
      <template #cards>
        <!-- 每日歌曲推荐 -->
        <div :class="$style.daily" @click="toDailyMusic">
          <div :class="$style.dateBox">
            <span :class="$style.date" v-text="theDay"></span>
          </div>
          <div>每日歌曲推荐</div>
        </div>
        <card-playlist v-for="item in playLists" :key="item.id" :playList="item" />
      </template>
    </the-section>
    <the-section title="最新音乐" cols="3" :to="{ name: 'Newsong' }">
      <template #cards>
        <card-song v-for="song in songs" :song="song"></card-song>
      </template>
    </the-section>
    <the-section title="推荐MV" cols="3" :to="{ name: 'Mv' }">
      <template #cards>
        <card-mv v-for="item in mvs" :key="item.id" :mv="item" />
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

import PlayList from '@/model/PlayList';
import api from '@/api/index.js';
import useRouterMethods from '@/composables/useRouterMethods.js';
import { onMounted, reactive, toRefs, computed } from 'vue';
import Song from '@/model/Song';
import http from '@/api/http';

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
      playLists: [],
      privateContents: [],
      songs: [],
      mvs: [],
    });

    const theDay = computed(() => {
      return new Date().getDate();
    });

    const { toDailyMusic } = useRouterMethods();

    const getBanners = () => {
      http.getBanners(2).then((response) => {
        state.banners = response;
      });
    };

    const getPlaylists = () => {
      http.getPersonalizedPlayLists(9).then((res) => (state.playLists = res));
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
              state.songs = response.songs.map((item) => new Song(item));
            }
          });
        });
    };

    const getMvs = () => {
      http.getPersonalizedMvs().then((res) => {
        state.mvs = res;
      });
    };

    onMounted(() => {
      getBanners();
      getPlaylists();
      getSongs();
      getMvs();
    });

    return {
      ...toRefs(state),
      theDay,
      toDailyMusic,
    };
  },
};
</script>

<style module>
.personal > :not(:first-child) {
  margin-top: 20px;
}
.dateBox {
  display: flex;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 4px 0 rgba(120, 120, 120, 0.5);
  margin-bottom: 10px;
  cursor: pointer;
}
.dateBox::after {
  content: '';
  display: block;
  width: 0;
  padding-bottom: 100%;
}
.date {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 80px;
  font-weight: bold;
  letter-spacing: 10px;
  color: rgb(236, 65, 65);
}
</style>
