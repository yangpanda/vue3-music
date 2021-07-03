import * as playlist from '@/api/service/playlist.js'
import * as song from '@/api/service/song.js'
import { ref, onMounted, watch, resolveComponent } from 'vue'
import Playlist from '@/model/Playlist.js'
import Song from '@/model/Song.js'

export function usePlaylistGetPersonalized() {
  const personalized = ref([])

  const getPersonalized = async () => {
    const response = await playlist.getPersonalized(10)
    response.result.map(item => {
      personalized.value.push(new Playlist(item))
    })
  }

  onMounted(getPersonalized)

  return {
    personalized,
  }
}

export async function getSongDetail(ids) {
  const songs = []
  const response = await song.getSongDetail(ids.join(','))
  response.songs.map(item => songs.push(new Song(item)))
  return songs
}

export async function getPlaylistDetail(id) {
    const detailData = await playlist.getPlaylistDetail(id);
    return new Playlist(detailData.playlist);
}

export function usePlaylistGetDetail(id) {
  const playlistDetail = ref({})
  let songs = ref([])

  onMounted(() => {
    getPlaylistDetail(id).then(response => {
      playlistDetail.value = response
    })
  })
  watch(playlistDetail, () => {
    const ids = []
    playlistDetail.value.trackIds.map(item => { ids.push(item.id) })
    getSongDetail(ids).then(response => songs.value = response)
  })

  return {
    playlistDetail,
    songs
  }
}
