import api from '@/api/index.js';
import { mapMutations } from '@/lib/lib.js';
import Song from '../model/Song';
import chunk from 'lodash/chunk';

export default function usePlaylistMethods() {
  const { setPlaylist, setCurrentSong, setPlayingState } = mapMutations();

  const playAll = async (id) => {
    const res = await api.playlist.getPlaylistDetail(id);
    const songsId = res.playlist.trackIds.map((item) => item.id);
    // 将 id 划分为每个 chunk 大小为 500 的数组
    const idChunk = chunk(songsId, 500);

    const songs = [];
    const reqs = idChunk.map((chunk) => api.song.getSongDetail(chunk.join(',')));
    Promise.all(reqs).then((responses) => {
      responses.forEach((res) => {
        songs.push(...res.songs.map((item) => new Song(item)));
      });

      setPlaylist(songs);
      setCurrentSong(songs[0]);
      setPlayingState(true);
    });
  };

  return {
    playAll,
  };
}
