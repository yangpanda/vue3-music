import { useRouter } from 'vue-router';

export default function useRouterMethods() {
  const router = useRouter();

  const toHome = () => {
    router.push('/');
  };

  const toPlayListDetail = (id) => {
    router.push({
      name: 'PlayListDetail',
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
    });
  };

  return {
    toHome,
    toPlayListDetail,
    toAlbumDetail,
    toArtistDetail,
    toSearch,
    toMvDetail,
    toDailyMusic,
  };
}
