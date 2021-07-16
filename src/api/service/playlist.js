import request from "./request"

/**
 * @method 获取推荐歌单（需登录）
 * @param {Number} limit 返回数量，默认为 30
 */
export const getPersonalized = limit => {
  if (limit === undefined) {
    return request.get(`/personalized`)
  } else {
    return request.get(`/personalized?limit=${limit}`)
  }
}

export const getPlaylist = () =>
  request.get(`/top/playlist?limit=100`)

export const getPlaylistDetail = (id) =>
  request.get(`/playlist/detail?id=${id}`)

/**
 * @method 获取每日推荐歌曲（需登录）
 */
export const getDailySongs = () =>
  request.get("/recommend/songs");

export const getUserPlaylists = (uid) =>
  request.get(`/user/playlist?uid=${uid}`);

export const getRankList = () =>
  request.get("/toplist")
