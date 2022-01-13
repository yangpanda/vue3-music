<template>
  <div :class="$style.result" v-if="!loginStatus">
    <n-result status="404" title="您还没登录哦!!!" description="日拱一卒无有尽, 功不唐捐终入海." size="huge">
    </n-result>
  </div>
  <the-scrollbar v-else>
    <div :class="$style.header">
      <h2>每日歌曲推荐</h2>
      <p>根据你的音乐口味生成, 每天六点更新</p>
    </div>
    <song-table-list :songs="songs"></song-table-list>
  </the-scrollbar>
</template>

<script>
export default {
  name: 'DailyMusic',
};
</script>

<script setup>
import SongTableList from '@/components/SongTableList.vue';
import { NResult } from 'naive-ui';
import Song from '@/model/Song.js';
import api from '@/api/index.js';
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';

const songs = ref([]);

const store = useStore();
const loginStatus = computed(() => store.state.user.loginStatus);

const getDailySongs = () => {
  api.song.getRecommendSongs().then((res) => {
    songs.value = res.map((item) => new Song(item));
  });
};

onMounted(() => {
  if (loginStatus.value) {
    getDailySongs();
  }
});
</script>

<style module>
.result {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.header {
  margin: 20px;
}
</style>
