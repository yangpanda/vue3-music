import { useRouter } from "vue-router";

export default function useRouterMethods() {
  const router = useRouter()

  const toHome = () => {
    router.push('/')
  }
  
  const toPlaylistDetail = (id) => {
    router.push({
      name: 'PlaylistDetail',
      params: {
        id
      }
    });
  }

  const toArtistDetail = (id) => {
    router.push({
      name: 'ArtistDetail',
      params: {
        id
      }
    })
  }
  const toAlbumDetail = (id) => {
    router.push({
      name: 'AlbumDetail',
      params: {
        id
      }
    })
  }

  return {
    toHome,
    toPlaylistDetail,
    toAlbumDetail,
    toArtistDetail,
  }
}