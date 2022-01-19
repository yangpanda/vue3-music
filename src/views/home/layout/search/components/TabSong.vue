<template>
  <song-table-list :songs="state.songs"></song-table-list>
  <div>
    <n-pagination
      v-model:page="state.page"
      :page-size="state.limit"
      :page-count="Math.ceil(state.total / state.limit)"
      @update:page="search"
    ></n-pagination>
  </div>
</template>

<script>
export default {
  name: 'TabSong',
};
</script>
<script setup>
import api from '@/api/index.js';
import { onMounted, reactive, watch } from 'vue';
import SongTableList from '@/components/SongTableList.vue';
import { NPagination } from 'naive-ui';
import Song from '@/model/Song.js';

const props = defineProps({
  keywords: '',
});
const state = reactive({
  hasMore: false,
  page: 1,
  songs: [],
  limit: 30,
  total: 0,
});

const search = async () => {
  const res = await api.search.search({
    type: 1,
    keywords: props.keywords,
    offset: (state.page - 1) * state.limit,
  });
  if (res.code === 200) {
    state.hasMore = res.result.hasMore;
    state.total = res.result.songCount;
    const ids = res.result.songs.map((item) => item.id);
    api.song.getDetail(ids.join(',')).then((res) => {
      state.songs = res.map((item) => new Song(item));
    });
  }
};

onMounted(() => {
  search();
});

watch(
  () => props.keywords,
  () => {
    state.page = 1;
    state.hasMore = false;
    search();
  },
);
</script>
