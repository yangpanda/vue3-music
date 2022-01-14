import request from '../axios/index.js';

export const getNewSongs = (limit) => {
  if (limit === undefined) {
    return request.get(`/personalized/newsong`);
  } else {
    return request.get(`/personalized/newsong?limit=${limit}`);
  }
};

export const getSongDetail = (ids) => request.get(`/song/detail`, { params: { ids } });
export const getDetail = async (ids) => {
  const res = await request.get('/song/detail', {
    params: {
      ids,
    },
  });

  return res.songs;
};
export const getSongsUrl = (ids) => request.get(`/song/url?id=${ids}`);

export const getLyric = (id) => request.get(`/lyric?id=${id}`);

export const getTopSong = (params) => request.get(`/top/song`, { params });

export const getSimi = (id) => request.get(`/simi/song?id=${id}`);

export const getRecommendSongs = async () => {
  const res = await request.get('/recommend/songs');
  if (res.code === 200) {
    return res.data.dailySongs;
  }
};
