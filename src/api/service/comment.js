import request from "./request";

export const getPlaylistComment = (id) =>
  request.get(`/comment/playlist?id=${id}`)
