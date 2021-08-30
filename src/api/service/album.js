import request from "./request";

export const getAlbumDetail = (id) =>
  request.get(`/album?id=${id}`)
