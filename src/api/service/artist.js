import request from '../axios/index.js';
import Mv from '@/model/Mv.js';
import Artist from '@/model/Artist.js';
import Song from '@/model/Song.js';
import Album from '@/model/Album.js';

export const getArtistDetail = async (id) => {
  const res = await request.get(`/artist/detail`, { params: { id } });
  if (res.code === 200) {
    return Promise.resolve(new Artist(res.data.artist));
  }
};

// id,
// limit,
// offset,
export const getArtistAlbums = async (params) => {
  const res = await request.get('/artist/album', { params: params });
  if (res.code === 200) {
    return Promise.resolve({
      more: res.more,
      albums: res.hotAlbums.map((item) => new Album(item)),
    });
  }
};

export const getArtistMvs = async (id) => {
  const res = await request.get('/artist/mv', { params: { id } });

  if (res.code === 200) {
    return Promise.resolve(res.mvs.map((item) => new Mv(item)));
  }
};

export const getArtistHotSongs = async (id) => {
  const res = await request.get('/artists/', { params: { id } });
  if (res.code === 200) {
    return Promise.resolve(res.hotSongs.map((item) => new Song(item)));
  }
};

// params: {
//   initial: -1,
//   area: -1,
//   type: -1,
//   limit: 96,
//   offset: 0,
// },
export const getArtist = async (params) => {
  const res = await request.get('/artist/list', {
    params,
  });
  console.log(res);
  if (res.code === 200) {
    return Promise.resolve({
      more: res.more,
      artists: res.artists.map((item) => new Artist(item)),
    });
  }
};

export const getSimiArtists = async (id) => {
  const res = await request.get('/simi/artist', {
    params: { id },
  });
  if (res.code === 200) {
    return Promise.resolve(res.artists.map((item) => new Artist(item)));
  }
};
