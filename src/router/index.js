import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/discovery'
  },
  {
    path: '/discovery',
    redirect: '/discovery/personal-recommend',
    name: 'Discovery',
    component: () => import('views/Discovery/index.vue'),
    children: [
      { path: 'personal-recommend', component: () => import('views/Discovery/PersonalRecommend.vue') },
      { path: 'playlist', component: () => import('views/Discovery/Playlist.vue') },
      { path: 'anchor', component: () => import('views/Discovery/Anchor.vue') },
      { path: 'ranking', component: () => import('views/Discovery/Ranking.vue') },
      { path: 'newest-music', component: () => import('views/Discovery/NewestMusic.vue') },
      { path: 'artist', component: () => import('views/Discovery/Artist.vue') },
    ]
  },
  {
    path: '/playlist-detail/:id',
    name: 'Playlist',
    props: true,
    component: () => import('views/PlaylistDetail.vue'),
  },
  {
    path: '/fm',
    name: 'FM',
    component: () => import('views/FM.vue')
  },
  {
    path: '/mv',
    name: 'MV',
    component: () => import('views/Mv/index.vue'),
    children: [
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
