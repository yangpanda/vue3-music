const user = {
  namespaced: true,
  state: () => ({
    profile: {},
    loginStatus: false,
    collectedPlaylists: [],
    createdPlaylists: [],
  }),
  getters: {},
  mutations: {
    setProfile(state, profile) {
      state.profile = profile;
    },
    handleLogout(state) {
      state.profile = {};
      state.loginStatus = false;
      state.createdPlaylists = [];
      state.collectedPlaylists = [];
    },
    handleLogin(state, profile) {
      state.loginStatus = true;
      state.profile = profile;
    },
    setCollectedPlayLists(state, playlists) {
      state.collectedPlaylists = playlists;
    },
    setCreatedPlayLists(state, playlists) {
      state.createdPlaylists = playlists;
    },
  },
};

export default user;
