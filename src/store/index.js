import { createStore } from 'vuex';
import player from './player.js';
import user from './user/index.js';

export default createStore({
  modules: {
    player,
    user,
  },
});
