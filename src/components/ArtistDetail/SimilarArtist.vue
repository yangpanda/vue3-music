<template>
  <div :class="$style.cardArtistBox">
    <card-artist v-for="item in artists" :artist="item"></card-artist>
  </div>
</template>

<script>
import CardArtist from '@/components/CardArtist.vue';
import api from '@/api/index.js';
import Artist from '@/model/Artist.js';
import { ref } from 'vue';

export default {
  props: {
    id: '',
  },
  components: {
    CardArtist,
  },
  setup(props) {
    const artists = ref([]);
    api.artist.getSimi(props.id).then((response) => {
      if (response.code === 200) {
        artists.value = response.artists.map((item) => new Artist(item));
      }
    });

    return {
      artists,
    };
  },
};
</script>

<style module>
.cardArtistBox {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  row-gap: var(--gap-lg);
  column-gap: var(--gap-lg);
}
</style>
