import { createRouter, createWebHistory } from 'vue-router';
import store from '../store';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/home.vue'),
  },
];

const router = createRouter({
  history: createWebHistory('/music/'),
  routes,
});

router.beforeEach(() => {
  if (store.state.player.playingPageDisplayStatus) {
    store.commit('player/hidePlayingPage');
  }
});

export default router;
