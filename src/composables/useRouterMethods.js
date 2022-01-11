import { useRouter } from 'vue-router';

export default function useRouterMethods() {
  const router = useRouter();

  const toHome = () => {
    router.push('/');
  };

  const toLogin = () => {
    router.push('/login');
  };

  const toPlaylistDetail = (id) => {
    router.push({
      name: 'PlaylistDetail',
      params: {
        id,
      },
    });
  };

  const toSearch = (words) => {
    router.push({
      name: 'SearchPage',
      params: {
        words,
      },
    });
  };

  const toArtistDetail = (id) => {
    router.push({
      name: 'ArtistDetail',
      params: {
        id,
      },
    });
  };
  const toAlbumDetail = (id) => {
    router.push({
      name: 'AlbumDetail',
      params: {
        id,
      },
    });
  };
  const toMvDetail = (id) => {
    router.push({
      name: 'MvDetail',
      params: {
        id,
      },
    });
  };
  const toDailyMusic = () => {
    router.push({
      name: 'DailyMusic',
    })
  }

  return {
    toHome,
    toLogin,
    toPlaylistDetail,
    toAlbumDetail,
    toArtistDetail,
    toSearch,
    toMvDetail,
    toDailyMusic,
  };
}
