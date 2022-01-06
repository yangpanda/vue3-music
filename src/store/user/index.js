import * as types from './mutation-types.js';

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
    [types.SET_PROFILE](state, profile) {
      state.profile = profile;
    },
    [types.HANDLE_LOGOUT](state) {
      state.profile = {};
      state.loginStatus = false;
      state.createdPlaylists = [];
      state.collectedPlaylists = [];
    },
    [types.HANDLE_LOGIN](state, profile) {
      state.loginStatus = true;
      state.profile = profile;
    },
    [types.SET_COLLECTED_PLAYLISTS](state, playlists) {
      state.collectedPlaylists = playlists;
    },
    [types.SET_CREATED_PLAYLISTS](state, playlists) {
      state.createdPlaylists = playlists;
    },
  },
};

export default user;
