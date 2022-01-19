<template>
  <div>
    <div
      :class="$style.albumItem"
      v-for="(item, index) in albums"
      :key="index"
      @click="toAlbumDetail(item.id)"
    >
      <div :class="[$style.coverBox, 'cursor-pointer']">
        <the-image :src="item.picUrl" size="60" radius="6" />
      </div>
      <div class="ellipsis">{{ item.name }}</div>
      <div class="ellipsis">
        <the-link
          :class="$style.link"
          v-for="artist in item.artists"
          :to="{ name: 'ArtistDetail', params: { id: artist.id } }"
          >{{ artist.name }}</the-link
        >
      </div>
      <div :class="$style.size">{{ item.size }}</div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import api from '@/api/index.js';
import useRouterMethods from '@/composables/useRouterMethods.js';

export default {
  name: 'TabAlbum',
  setup() {
    const albums = ref([]);
    const count = ref(0);
    const { toAlbumDetail } = useRouterMethods();

    const getAlbum = () => {
      api.subscription.getAlbum().then((res) => {
        if (res.code === 200) {
          albums.value = res.data;
          count.value = res.count;
        }
      });
    };

    function generateArtists(artists) {
      return artists.map((item) => item.name).join(' / ');
    }

    onMounted(() => {
      getAlbum();
    });

    return {
      albums,
      count,
      generateArtists,
      toAlbumDetail,
    };
  },
};
</script>

<style module>
.albumItem {
  display: grid;
  grid-template-columns: 60px 2fr 1fr 40px;
  column-gap: 15px;
  padding: 10px 30px 10px 30px;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
}
.albumItem:nth-of-type(odd) {
  background-color: #f9f9f9;
}
.albumItem:hover {
  background-color: #e6e4e4;
}
.coverBox {
  flex-shrink: 0;
}
.size {
  text-align: middle;
}
.link:not(:first-child)::before {
  content: '';
  border-left: 1px solid rgba(0, 0, 0, 0.5);
  margin: 0 5px;
}
</style>
