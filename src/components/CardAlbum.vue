<template>
  <card-base class="cursor-pointer" :title="album.name" @click="toAlbumDetail(album.id)">
    <the-image :src="album.picUrl + '?param=180y180'" size="180" round="normal" />
  </card-base>
</template>

<script>
import CardBase from '@/components/CardBase.vue';

export default {
  name: 'CardAlbum',
  components: {
    CardBase,
  },
  props: {
    album: Object,
  },
  setup() {
    return {};
  },
};
</script>
