<template>
  <div :class="$style.personal">
    <the-swiper :banners="banners" />
    <the-section title="推荐歌单" cols="5" :page="{ name: 'Playlist' }">
      <template #cards>
	<!-- 每日歌曲推荐 -->
	<div :class="$style.daily" @click="toDailyMusic">
	  <div :class="$style.dateBox">
	    <span :class="$style.date" v-text="theDay"></span>
	  </div>
	  <div>每日歌曲推荐</div>
	</div>
        <card-playlist v-for="(item, index) in playLists" :key="item.id" :playList="item" />
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
import useRouterMethods from '@/composables/useRouterMethods.js';
import { onMounted, reactive, toRefs, computed } from 'vue';

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
      return new Date().getDate()
    })

    const { toDailyMusic } = useRouterMethods();

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
      api.playlist.getPersonalized(9).then((response) => {
        if (response.code === 200) {
          state.playLists = response.result.map((item) => new Playlist(item));
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
      theDay,
      toDailyMusic,
    };
  },
};
</script>

<style module>
.personal {
  display: flex;
  flex-direction: column;
  row-gap: 2rem;
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
  font-size: 100px;
  font-weight: bold;
  letter-spacing: 10px;
  color: rgb(236, 65, 65);
}
</style>
