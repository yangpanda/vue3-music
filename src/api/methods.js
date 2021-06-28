import api from "./api";

export const getDailySongs = () =>
  api.get("/recommend/songs", { credentials: "include" });

export const login = (email, password) =>
  api.get(`/login/email?email=${email}&password=${password}`, {
    credentials: "include",
  });

export const fetchSongsDetail = (ids) =>
  api.get(`/song/detail?ids=${ids}`, { credentials: "include" });

export const fetchSongsUrl = (ids) => api.get(`/song/url?id=${ids}`, {});

export const fetchFavoredPlaylists = (uid) =>
  api.get(`/user/playlist?uid=${uid}`, { credentials: "include" });

export const fetchPrivateContents = () =>
  api.get(`/personalized/privatecontent`, {});

export const fetchRecommendPlaylists = (count) =>
  api.get(`/personalized?limit=${count}`, { credentials: "include" });

export const fetchPlaylistDetail = (id) =>
  api.get(`/playlist/detail?id=${id}`, { credentials: "include" });

export const fetchAllPlaylist = () =>
  api.get(`/top/playlist?limit=100`, {})

export const fetchBanners = (type) => api.get(`/banner?type=${type}`, {});

export const fetchNewSongs = (count) =>
  api.get(`/personalized/newsong?limit=${count}`, {});

export const fetchPersonalizedMvs = () =>
  api.get(`/personalized/mv`, {})

export const fetchLoginStatus = () =>
  api.get(`/login/status`, { credentials: "include" })
