import request from "../axios/index.js";

export const getArtist = (params) =>
  request.get('/artist/list', {params})
