import request from '../axios/index.js';

export const getAlbum = () => request.get('/album/sublist');

export const getArtist = () => request.get('/artist/sublist');

export const getMv = () => request.get('/mv/sublist');
