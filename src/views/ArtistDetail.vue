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
        <n-tab-pane name="album" tab="专辑">
          <album-list :id="id" />
        </n-tab-pane>
        <n-tab-pane name="mv" tab="MV">
          <mv :id="id"></mv>
        </n-tab-pane>
        <n-tab-pane name="description" tab="歌手详情">{{ artist.description }}</n-tab-pane>
        <n-tab-pane name="similar-artist" tab="相似歌手">
          <similar-artist :id="id"></similar-artist>
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
import AlbumList from '@/components/ArtistDetail/AlbumList.vue'
import SimilarArtist from '@/components/ArtistDetail/SimilarArtist.vue'
import Mv from '@/components/ArtistDetail/Mv.vue'

export default {
  props: {
    id: [String, Number]
  },
  components: {
    NTabs,
    NTabPane,
    NScrollbar,
    AlbumList,
    SimilarArtist,
    Mv,
  },
  setup(props) {
    const artist = ref(new Artist())

    api.artist.getDetail(props.id)
      .then(response => {
        if (response.code === 200) {
          artist.value = new Artist(response.data.artist)
        }
      })

    return {
      artist,
    }
  }
}

</script>

<style scoped lang="postcss">
</style>