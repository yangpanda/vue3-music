<template>
  <div :class="$style.container">
    <div :class="$style.title">{{ title }}</div>
    <div :class="$style.list">
      <div :class="$style.listItem" v-for="(item, index) in theSongs" @dblclick="play(index)">
        <div>{{ addZero(index + 1) }}</div>
        <div :style="{ color: 'black' }">{{ item.name }}</div>
        <div>{{ item.duration }}</div>
      </div>
      <div v-if="!showAll && !(songarr.length < 10)" :class="$style.toggle" @click="() => (showAll = true)">
        查看全部 {{ songarr.length }} 首 >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SongList',
};
</script>

<script setup>
import { addZero } from '@/utils';
import { ref, onMounted, computed } from 'vue';
import http from '@/api/http';
import Song from '@/model/Song';
import { useStore } from 'vuex';

const props = defineProps({
  songs: {
    type: Array,
    default: [],
  },
  title: '',
  albumId: [String, Number],
});

const showAll = ref(false);
const songarr = ref([]);
const store = useStore();
const playTheList = (index) => store.commit('player/playTheList', songarr.value, index);
const setCurrentIndex = (index) => store.commit('player/setCurrentIndex', index);
const play = (index) => {
  playTheList(index);
  setCurrentIndex(index);
};

const theSongs = computed(() => {
  if (props.songs.length) {
    songarr.value = props.songs;
  }
  if (showAll.value) {
    return songarr.value;
  } else {
    return songarr.value.slice(0, 10);
  }
});

const getSongs = async () => {
  const { songs } = await http.getAlbumDetail(props.albumId);
  songarr.value = songs;
};

onMounted(() => {
  if (props.albumId) {
    getSongs();
  }
});
</script>

<style module>
.title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}
.listItem {
  flex-grow: 1;
  display: grid;
  grid-template-columns: 4em 1fr 8em;
  align-items: center;
  padding: 0 20px;
  height: 40px;
  color: rgba(0, 0, 0, 0.5);
  cursor: default;
}
.listItem:nth-child(odd) {
  background-color: rgba(0, 0, 0, 0.03);
}
.listItem:hover {
  background-color: rgba(0, 0, 0, 0.05);
}
.toggle {
  cursor: pointer;
  line-height: 30px;
  height: 30px;
  background-color: rgba(0, 0, 0, 0.03);
  color: rgba(0, 0, 0, 0.5);
  text-align: right;
  padding-right: 30px;
}
.toggle:hover {
  color: black;
}
</style>
