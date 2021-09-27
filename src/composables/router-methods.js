import { useRouter } from "vue-router";

export default function useRouterMethods() {
  const router = useRouter()
  
  const toPlaylistDetail = (id) => {
    router.push({
      name: 'PlaylistDetail',
      params: {
        id
      }
    });
  }

  return {
    toPlaylistDetail
  }
}