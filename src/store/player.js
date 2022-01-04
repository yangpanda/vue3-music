import { shuffle } from "lodash"

const PlayMode = {
  sequence: 0,
  listLoop: 1,
  singleLoop: 2,
  random: 3,
}

const player = {
  namespaced: true,
  state: () => ({
    playing: false,
    playMode: PlayMode.sequence,
    currentSong: null,
    playlist: null,
    randomPlaylist: null,
  }),
  mutations: {
    setPlayMode(state) {
      if (state.playMode != PlayMode.random) {
        state.playMode += 1
      } else {
        state.playMode = PlayMode.sequence
      }
    },
    setPlaylist(state, playlist) {
      state.playlist = playlist
    },
    playSong(state, song) {
      state.currentSong = song
    },
    setRandomPlaylist(state) {
      if (state.playlist) {
        const indexArr = [...Array(state.playlist.length).keys()];
        state.randomPlaylist = shuffle(indexArr);
      }
    }
  },
  getters: {

  }
}