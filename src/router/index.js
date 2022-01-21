import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/home.vue'),
  },
  {
    path: '/playlist-detail',
    name: 'PlayListDetail',
    component: () => import('@/views/playListDetail.vue'),
  },
];

const router = createRouter({
  history: createWebHistory('/music/'),
  routes,
});

export default router;
