export default {
  setLogined(state, status) {
    state.logined = status;
  },
  setUserinfo(state, info) {
    state.userinfo = info;
  },
  setLikedSongs(state, songs) {
    state.likedSongs = songs;
  },
  insertSong(state, song) {
    let length = state.playlist.length;
    state.playlist.splice(state.playIndex + 1, 0, song);
    if (length > 0) {
      state.playIndex += 1;
    }
  },
  setUserPlaylists(state, playlists) {
    state.userPlaylists = playlists;
  },
};
