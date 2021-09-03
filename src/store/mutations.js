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
  },
  setPlayMode(state, mode) {
    state.playMode = mode
  },
  insertSong(state, song) {
    let length = state.playlist.length
    state.playlist.splice(state.playIndex + 1, 0, song)
    if (length > 0) {
      state.playIndex += 1
    }
  },
  setRandomPlaylist(state) {
    const playlist = [...Array(state.playlist.length).keys()]

    for (let i = 0; i < playlist.length; i++) {
      const swapIndex = ~~(i + Math.random() * (playlist.length - i));

      [ playlist[i], playlist[swapIndex] ] = [ playlist[swapIndex], playlist[i] ];
    }

    state.randomPlaylist = playlist
  },
  setCurrentSong(state, song) {
    state.currentSong = song
  },
  setPlayingState(state, theState) {
    state.playingState = theState
  }
}
