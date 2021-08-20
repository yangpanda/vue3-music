import * as playlist from '@/api/service/playlist.js'
import * as song from '@/api/service/song.js'
import { ref, onMounted, watch } from 'vue'
import Playlist from '@/model/Playlist.js'
import Song from '@/model/Song.js'

export function usePlaylistPersonalized() {
  const personalizedPlaylists = ref([])

  const getPersonalized = async () => {
    const response = await playlist.getPersonalized(10)
    personalizedPlaylists.value = response.result.map(item => new Playlist(item))
  }

  onMounted(getPersonalized)

  return {
    personalizedPlaylists,
  }
}

export async function getSongDetail(ids) {
  let songs = []
  const response = await song.getSongDetail(ids.join(','))
  songs = response.songs.map(item => new Song(item))
  return songs
}

export async function getPlaylistDetail(id) {
  const detailData = await playlist.getPlaylistDetail(id);
  return new Playlist(detailData.playlist);
}

export function usePlaylistDetail(id) {
  const playlistDetail = ref({})
  const songs = ref([])

  onMounted(() => {
    getPlaylistDetail(id).then(response => {
      playlistDetail.value = response
    })
  })
  watch(playlistDetail, () => {
    let ids = []
    ids = playlistDetail.value.trackIds.map(item => item.id)
    getSongDetail(ids).then(response => songs.value = response)
  })

  return {
    playlistDetail,
    songs
  }
}
