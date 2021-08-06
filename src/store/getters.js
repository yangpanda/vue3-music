
export default {
  isLogined(state) {
    return state.logined
  },
  getUserinfo(state) {
    return state.userinfo
  },
  getPlayIndex(state) {
    return state.playIndex
  },
  getPlaylist(state) {
    return state.playlist
  },
  getPlayMode(state) {
    return state.playMode
  },
  getRandomPlaylist(state) {
    return state.randomPlaylist
  },
  getCurrentSong(state) {
    return state.currentSong
  }
}
