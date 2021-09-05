import request from "../axios/index.js";

export const ofPlaylist = (id) =>
  request.get(`/comment/playlist?id=${id}`)

/**
 * @method 获取歌曲评论
 * @param {Number} limit 返回数量，默认为 20
 * @param {Number} id 音乐 id
 * @param before 
 */
export const ofSong = (params) => request.get(`/comment/music`, { params }) 
