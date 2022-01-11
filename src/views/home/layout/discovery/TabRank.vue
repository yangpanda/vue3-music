<template>
  <div :class="$style.rank">
    <div :class="$style.section" v-for="value in state">
      <h2>{{ value.name }}</h2>
      <div :class="$style.content">
        <card-playlist v-for="(item, index) in value.list" :key="item.id" :playList="item" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Ranking',
};
</script>

<script setup>
import CardPlaylist from '@/components/CardPlaylist.vue';
import { onMounted, reactive } from 'vue';
import Playlist from '@/model/Playlist.js';
import api from '@/api/index.js';

const state = reactive({
  official: {
    name: '官方榜',
    list: []
  },
  global: {
    name: '全球榜',
    list: []
  }
})

const getRankList = async () => {
  const res = await api.playlist.getRankList();

  if (res.code === 200) {
    res.list.map((item) => {
      if ('ToplistType' in item) {
        state.official.list.push(new Playlist(item));
      } else {
        state.global.list.push(new Playlist(item));
      }
    });
  }
};

onMounted(getRankList);
</script>

<style module>
.section:last-child {
  margin-top: 20px;
}
.content {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  row-gap: 20px;
  column-gap: 20px;
}
</style>
