import { createStore } from 'vuex';
import player from './player.js';
import user from './user.js';

export default createStore({
  modules: {
    player,
    user,
  },
});
