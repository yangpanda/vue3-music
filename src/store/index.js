import { createStore } from 'vuex'

export default createStore({
  state: {
    playlists: [],
    currentSong: null,
    accountId: null,
  },
  mutations: {
    setCurrentSong(state, song) {
      state.currentSong = song
    },
    setAccountId(state, id) {
      state.accountId = id
    },
    setPlayLists(state, playlists) {
      state.playlists = playlists
    }
  },
  actions: {},
  modules: {}
})
