<template>
  <div class="space-y-5">
    <div class="flex" v-for="item in albums">
      <the-image :src="item.picUrl + '?param=180y180'" size="180" round="normal" />
    </div>
  </div>
</template>

<script>
import CardAlbum from '@/components/CardAlbum.vue';
import api from '@/api/index.js';
import { ref } from 'vue';

export default {
  props: {
    id: '',
  },
  components: {
    CardAlbum,
  },
  setup(props) {
    const albums = ref([]);
    api.artist.getAlbum({ id: props.id }).then((response) => {
      if (response.code === 200) {
        albums.value = response.hotAlbums;
      }
    });

    return {
      albums,
    };
  },
};
</script>
