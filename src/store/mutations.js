export default {
  setLoginStatus(state, status) {
    state.logined = status
  },
  setUserinfo(state, info) {
    state.userinfo = info
  },
  setPlaylist(state, list) {
    state.playlist = list
  },
  setLikedSongList(state, list) {
    state.likedSongList = list
  },
  setPlayIndex(state, index) {
    if (state.playlist.length === index) {
      state.playIndex = 0
    } else if (index < 0) {
      state.playIndex = state.playlist.length - 1
    } else {
      state.playIndex = index
    }
  }
}
