import * as song from '@/api/service/song.js'
import { ref, onMounted } from 'vue'
import Song from '@/model/Song.js'

export function useSongNewsong() {
  const newsongs = ref([])

  const getNewSongs = async () => {
    const res = await song.getNewSongs(15);
    const songIds = [];
    res.result.map((item) => songIds.push(item.id));

    const songsData = await song.getSongDetail(songIds.join(","));
    songsData.songs.map((item) => {
      newsongs.value.push(new Song(item))
    });
  }

  onMounted(getNewSongs)

  return {
    newsongs
  }
}
