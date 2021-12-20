import request from '../axios/index.js';

/**
 * @method 获取推荐歌单（需登录）
 * @param {Number} limit 返回数量，默认为 30
 */
export const getPersonalized = (limit) => {
  if (limit === undefined) {
    return request.get(`/personalized`);
  } else {
    return request.get(`/personalized?limit=${limit}`);
  }
};

export const getPlaylist = (params) => {
  if (params === undefined) {
    return request.get(`/top/playlist`);
  } else {
    return request.get(`/top/playlist`, { params });
  }
};

export const getPlaylistDetail = (id) => request.get(`/playlist/detail?id=${id}`);

/**
 * @method 获取每日推荐歌曲（需登录）
 */
export const getDailySongs = () => request.get('/recommend/songs');

export const getUserPlaylists = (uid) => request.get(`/user/playlist?uid=${uid}`);

export const getRankList = () => request.get('/toplist');

export const getPlaylistHotTags = () => request.get('/playlist/hot');

export const getHotTags = () => request.get('/playlist/hot');

export const getPlaylistCat = () => request.get('/playlist/catlist');

export const getTopAlbum = (params) => request.get(`/top/album`, { params });

// t : 类型,1:收藏,2:取消收藏
export const subscribe = (t, id) =>
  request.get('/playlist/subscribe', {
    params: {
      t,
      id,
    },
  });
