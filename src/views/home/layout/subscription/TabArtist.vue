<template>
  <div :class="$style.artists">
    <div
      :class="$style.artistItem"
      v-for="(item, index) in artists"
      :key="index"
      @click="toArtistDetail(item.id)"
    >
      <div :class="[$style.coverBox, 'cursor-pointer']">
        <the-image :src="item.picUrl + '?param=160y160'" size="60" round="normal" />
      </div>
      <div class="ellipsis">{{ item.name }}</div>
      <div class="ellipsis">专辑: {{ item.albumSize }}</div>
      <div>MV: {{ item.mvSize }}</div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import api from '@/api/index.js';
import useRouterMethods from '@/composables/router-methods.js';

export default {
  name: 'TabArtist',
  setup() {
    const artists = ref([]);
    const count = ref(0);
    const { toArtistDetail } = useRouterMethods();

    const getArtist = () => {
      api.subscription.getArtist().then((res) => {
        if (res.code === 200) {
          res;
          artists.value = res.data;
          count.value = res.count;
        }
      });
    };

    onMounted(() => {
      getArtist();
    });

    return {
      artists,
      count,
      toArtistDetail,
    };
  },
};
</script>

<style module>
.artistItem {
  display: grid;
  grid-template-columns: 60px 2fr 1fr 1fr;
  column-gap: 15px;
  padding: 10px 30px 10px 30px;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
}
.artistItem:nth-of-type(even) {
  background-color: #f9f9f9;
}
.artistItem:hover {
  background-color: #e9e7e7;
}
</style>
