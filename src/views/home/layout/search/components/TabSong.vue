<template>
  <div>
    <song-table-list :songs="songs"></song-table-list>
  </div>
</template>

<script>
import api from '@/api/index.js'
import { ref, watchEffect } from 'vue'
import SongTableList from '../../../../../components/SongTableList.vue'
import Song from '@/model/Song.js'

export default {
  props: {
    keywords: null,
  },
  components: {
    SongTableList
  },
  setup(props) {
    const results = ref(null)
    const songs = ref([])

    watchEffect(() => {
      api.search.search(1, props.keywords).then(res => {
        console.log(res)
        if (res.code === 200) {
          songs.value = res.result.songs.map(item => new Song(item))
        }
      })
    })

    return {
      results,
      songs,
    }
  }
}
</script>

<style module>
</style>