import request from '../axios/index.js';
import PlayList from '@/model/PlayList.js';

export const getPersonalizedPlayLists = async (limit) => {
  const res = await request.get('/personalized', { params: { limit } });
  if (res.code === 200) {
    return Promise.resolve(res.result.map((item) => new PlayList(item)));
  }
};

export const getPlayLists = async (params) => {
  const res = await request.get(`/top/playlist`, { params });
  if (res.code === 200) {
    return Promise.resolve({
      total: res.total,
      playLists: res.playlists.map((item) => new PlayList(item)),
    });
  }
};

export const getPlayListDetail = async (id) => {
  const res = await request.get('/playlist/detail', { params: { id } });
  if (res.code === 200) {
    return Promise.resolve(new PlayList(res.playlist));
  }
};

/**
 * @method 获取每日推荐歌曲（需登录）
 */
export const getDailySongs = () => request.get('/recommend/songs');

export const getUserPlaylists = (uid) => request.get(`/user/playlist?uid=${uid}`);

export const getRankList = () => request.get('/toplist');

export const getPlaylistHotTags = () => request.get('/playlist/hot');

export const getPlaylistCat = () => request.get('/playlist/catlist');

export const getTopAlbum = (params) => request.get(`/top/album`, { params });
