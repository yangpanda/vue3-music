
import request from "./request";

export const getArtist = (params) =>
  request.get('/artist/list', {params})
