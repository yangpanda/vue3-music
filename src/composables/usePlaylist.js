import * as playlist from '@/api/service/playlist.js'
import * as song from '@/api/service/song.js'
import { ref, onMounted, watch } from 'vue'
import Playlist from '@/model/Playlist.js'
import Song from '@/model/Song.js'

export function usePlaylistGetPersonalized() {
  const personalized = ref([])

  const getPersonalized = async () => {
    const response = await playlist.getPersonalized(10)
    response.result.map(item =>
      personalized.value.push(new Playlist(item))
    )
  }

  onMounted(getPersonalized)

  return {
    personalized,
  }
}

async function getSongDetail(ids) {
  const songs = []
  const response = await song.getSongDetail(ids.join(','))
  response.songs.map(item => songs.push(new Song(item)))
  return songs
}

export function usePlaylistGetDetail(id) {
  const playlistDetail = ref({})
  let songs = ref([])

  const getPlaylistDetail = async () => {
    const detailData = await playlist.getPlaylistDetail(id);
    playlistDetail.value = new Playlist(detailData.playlist);
  }

  onMounted(getPlaylistDetail)
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