<template>
  <div class="grid sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-8 gap-5 mx-auto">
    <card-artist v-for="item in artists" :artist="item"></card-artist>
  </div>
</template>

<script>
import CardArtist from '@/components/CardArtist.vue'
import api from '@/api/index.js'
import Artist from '@/model/Artist.js'
import { ref } from 'vue'

export default {
  props: {
    id: ''
  },
  components: {
    CardArtist,
  },
  setup(props) {
    const artists = ref([])
    api.artist.getSimi(props.id)
      .then(response => {
        if (response.code === 200) {
          artists.value = response.artists.map(item => new Artist(item))
        }
      })

    return {
      artists
    }
  }
}
</script>