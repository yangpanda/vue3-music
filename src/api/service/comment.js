import request from "../axios/index.js";

export const getPlaylistComment = (id) =>
  request.get(`/comment/playlist?id=${id}`)
