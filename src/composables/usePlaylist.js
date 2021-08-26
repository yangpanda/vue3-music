import * as playlist from '@/api/service/playlist.js'
import * as song from '@/api/service/song.js'
import { ref, onMounted, watch } from 'vue'
import Playlist from '@/model/Playlist.js'
import Song from '@/model/Song.js'
import { useLoadingBar } from 'naive-ui'

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

export function usePlaylistGet() {
  const loading = ref(true)
  const playlists = ref([])
  const loadingBar = useLoadingBar()

  const getPlaylist = async (param) => {
    loading.value = true
    loadingBar.start()
    const res = await playlist.getPlaylist(param);
    if (res.code === 200) {
      playlists.value = res.playlists.map(item => new Playlist(item))
      loading.value = false
      loadingBar.finish()
    }
  };

  return {
    playlists,
    getPlaylist,
    loading,
  }
}

export function usePlaylistHotTags() {
  const hotTags = ref([])
  const hotTagsMenuOption = ref([])

  const gettPlaylistHotTags = async () => {
    const res = await playlist.getHotPlaylistTags();
    if (res.code === 200) {
      hotTags.value = res.tags.map((tag) => tag.name);
      hotTagsMenuOption.value = hotTags.value.map((tag) => {
        return {
          label: tag,
          key: tag,
        }
      })
    }
  }

  onMounted(gettPlaylistHotTags)

  return {
    hotTags,
    hotTagsMenuOption,
    gettPlaylistHotTags
  }
}

export function usePlaylistCat() {
  const categories = ref([])
  const all = ref({})

  const getPlaylistCat = async () => {
    const res = await playlist.getPlaylistCat();
    if (res.code === 200) {
      all.value = {
        name: res.all.name,
        count: res.all.resourceCount
      }

      for (let key in res.categories) {
        let sub = res.sub
          .filter((item) => item.category == key)
          .map((item) => {
            return { name: item.name, count: item.resourceCount, hot: item.hot }
          });
        categories.value.push({
          cat: res.categories[key],
          sub,
        })
      }
    }
  };

  onMounted(getPlaylistCat)

  return {
    categories,
    all,
    getPlaylistCat,
  }
}
