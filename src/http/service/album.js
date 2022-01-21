import Album from '@/model/Album.js';
import Song from '@/model/Song.js';
import request from '../axios/index.js';

export const getAlbumDetail = async (id) => {
  const response = await request.get('/album', {
    params: {
      id,
    },
  });

  if (response.code === 200) {
    return Promise.resolve({
      songs: response.songs.map((item) => new Song(item)),
      album: new Album(response.album),
    });
  }
};
