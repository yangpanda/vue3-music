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
    component: () => import('@/views/Discovery/index.vue'),
    children: [
      { path: 'personal-recommend', component: () => import('@/views/Discovery/PersonalRecommend.vue') },
      { path: 'playlist', component: () => import('@/views/Discovery/Playlist.vue') },
      { path: 'ranking', component: () => import('@/views/Discovery/Ranking.vue') },
      { path: 'artist', component: () => import('@/views/Discovery/Artist.vue') },
      {
        path: 'new-song',
        component: () => import('@/views/Discovery/NewSong/index.vue'),
        redirect: '/discovery/new-song/top-song/',
        children: [
          {name: 'TopSong', path: 'top-song', component: () => import('@/views/Discovery/NewSong/TopSong.vue')},
          {name: 'TopAlbum', path: 'top-album', component: () => import('@/views/Discovery/NewSong/TopAlbum.vue')}
        ]
      },
    ]
  },
  {
    path: '/playlist-detail/:id',
    name: 'PlaylistDetail',
    props: true,
    component: () => import('@/views/PlaylistDetail.vue'),
  },
  {
    path: '/mv-detail/:id',
    name: 'MvDetail',
    props: true,
    component: () => import('@/views/Mv/MvDetail.vue'),
  },
  {
    path: '/fm',
    name: 'FM',
    component: () => import('@/views/FM.vue')
  },
  {
    path: '/mv',
    name: 'MV',
    component: () => import('@/views/Mv/index.vue'),
    children: [
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
