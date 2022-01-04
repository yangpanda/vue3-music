import { createStore } from 'vuex';

import getters from './getters.js';
import mutations from './mutations.js';
import state from './state.js';
import player from './player.js';
import user from './user.js';

export default createStore({
  state,
  getters,
  mutations,
  modules: {
    player,
    user,
  },
});
