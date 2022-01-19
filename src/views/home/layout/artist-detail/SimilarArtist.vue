<template>
  <div :class="$style.cardArtistBox">
    <card-artist v-for="item in artists" :artist="item" :key="item.id"></card-artist>
  </div>
</template>

<script>
export default {
  name: 'SimiArtist',
};
</script>
<script setup>
import CardArtist from '@/components/CardArtist.vue';
import http from '@/api/http.js';
import { ref } from 'vue';

const props = defineProps({
  id: '',
});

const artists = ref([]);

http.getSimiArtists(props.id).then((res) => {
  artists.value = res;
});
</script>

<style module>
.cardArtistBox {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  row-gap: var(--gap-lg);
  column-gap: var(--gap-lg);
}
</style>
