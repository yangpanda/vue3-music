import request from '../axios/index.js';

export const getAlbumDetail = (id) => request.get(`/album?id=${id}`);
