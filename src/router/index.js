import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/home/index.vue'),
    redirect: '/discovery/',
    children: [
      {
        path: '/layout/',
        component: () => import('@/views/home/layout/index.vue'),
        children: [
          {
            path: '/discovery',
            name: 'Discovery',
            component: () => import('@/views/home/layout/discovery/index.vue'),
          },
          {
            path: '/playlist-detail/:id',
            name: 'PlaylistDetail',
            props: true,
            component: () => import('@/views/PlaylistDetail.vue'),
          },
          {
            path: '/album-detail/:id',
            name: 'AlbumDetail',
            props: true,
            component: () => import('@/views/AlbumDetail.vue'),
          },
          {
            path: '/artist-detail/:id',
            name: 'ArtistDetail',
            props: true,
            component: () => import('@/views/ArtistDetail.vue'),
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
      },
      {
        path: '/mv-detail/:id',
        name: 'MvDetail',
        props: true,
        component: () => import('@/views/Mv/MvDetail.vue'),
      }
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
