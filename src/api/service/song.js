import request from "./request";

export const getNewSongs = (limit) => {
  if (limit === undefined) {
    return request.get(`/personalized/newsong`);
  } else {
    return request.get(`/personalized/newsong?limit=${limit}`);
  }
}

export const getSongDetail = (ids) =>
  request.get(`/song/detail?ids=${ids}`);

export const getSongsUrl = (ids) =>
  request.get(`/song/url?id=${ids}`);

export const getLyric = (id) =>
  request.get(`/lyric?id=${id}`)
