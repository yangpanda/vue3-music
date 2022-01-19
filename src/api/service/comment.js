import request from '../axios/index.js';

export const getPlayListComments = async (params) => {
  const res = await request.get('/comment/playlist', { params });
  if (res.code === 200) {
    return Promise.resolve({
      total: res.total,
      comments: res.comments,
    });
  }
};

export const getSongComments = async (params) => {
  const res = await request.get(`/comment/music`, { params });
  if (res.code === 200) {
    return Promise.resolve({
      total: res.total,
      comments: res.comments,
    });
  }
};

export const getAlbumComments = async (params) => {
  const res = await request.get('/comment/album', { params });
  if (res.code === 200) {
    return Promise.resolve({
      total: res.total,
      comments: res.comments,
    });
  }
};
