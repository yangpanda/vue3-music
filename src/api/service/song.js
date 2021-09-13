import request from "../axios/index.js";

export const getNewSongs = (limit) => {
  if (limit === undefined) {
    return request.get(`/personalized/newsong`);
  } else {
    return request.get(`/personalized/newsong?limit=${limit}`);
  }
}

export const getSongDetail = (ids) =>
  request.get(`/song/detail`, {params: {ids}});

export const getSongsUrl = (ids) =>
  request.get(`/song/url?id=${ids}`);

export const getLyric = (id) =>
  request.get(`/lyric?id=${id}`)

export const getTopSong = (params) =>
  request.get(`/top/song`, {params})

export const getSimi = (id) => request.get(`/simi/song?id=${id}`)