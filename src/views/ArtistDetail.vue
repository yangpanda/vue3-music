<template>
  <n-scrollbar>
    <div class="p-5">
      <div class="flex gap-x-5">
        <the-image size="180" :src="artist.cover + '?param=180y180'" round="large" />
        <div class="space-y-2">
          <div class="text-lg">{{ artist.name }}</div>
          <div class="space-x-5">
            <span>单曲数: {{ artist.musicSize }}</span>
            <span>专辑数: {{ artist.albumSize }}</span>
            <span>MV数: {{ artist.mvSize }}</span>
          </div>
        </div>
      </div>
      <n-tabs type="line">
        <n-tab-pane name="album" tab="专辑">专辑</n-tab-pane>
        <n-tab-pane name="mv" tab="MV">MV</n-tab-pane>
        <n-tab-pane name="description" tab="歌手详情">{{ artist.description }}</n-tab-pane>
        <n-tab-pane name="similar-artist" tab="相似歌手">
          <div class="grid grid-cols-6 gap-5 mx-auto">
            <card-artist v-for="item in simi" :artist="item"></card-artist>
          </div>
        </n-tab-pane>
      </n-tabs>
    </div>
  </n-scrollbar>
</template>

<script>
import api from '@/api/index.js'
import { ref } from 'vue'
import Artist from '@/model/Artist.js'
import { NTabs, NTabPane, NScrollbar } from 'naive-ui'
import CardArtist from '@/components/CardArtist.vue'

export default {
  props: {
    id: [String, Number]
  },
  components: {
    NTabs,
    NTabPane,
    CardArtist,
    NScrollbar,
  },
  setup(props) {
    const artist = ref(new Artist())
    const simi = ref([])
    const album = ref([])

    api.artist.getDetail(props.id)
      .then(response => {
        if (response.code === 200) {
          console.log(response.data)
          artist.value = new Artist(response.data.artist)
        }
      })

    api.artist.getSimi(props.id)
      .then(response => {
        if (response.code === 200) {
          simi.value = response.artists.map(item => new Artist(item))
        }
      })

    api.artist.getAlbum({id: props.id})
      .then(res => {
        if (res.code === 200) {
          console.log(res)
        }
      })
    return {
      artist,
      simi
    }
  }
}

</script>

<style scoped lang="postcss">
</style>