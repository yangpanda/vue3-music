import request from '../axios/index.js';

export const getArtist = (params) => request.get('/artist/list', { params });

export const getDetail = (id) => request.get(`/artist/detail`, { params: { id } });

export const getSimi = (id) => request.get('/simi/artist', { params: { id } });

export const getAlbum = (params) => request.get('/artist/album', { params: params });

export const getMv = (id) => request.get('/artist/mv', { params: { id } });
