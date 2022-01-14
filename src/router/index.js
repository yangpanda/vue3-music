import { createRouter, createWebHistory } from 'vue-router';
import store from '../store';

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
            redirect: '/discovery/personal',
            children: [
              {
                path: '/discovery/personal',
                name: 'Personal',
                component: () => import('@/views/home/layout/discovery/TabPersonal.vue'),
              },
              {
                path: '/discovery/playlist',
                name: 'Playlist',
                component: () => import('@/views/home/layout/discovery/TabPlaylist.vue'),
              },
              {
                path: '/discovery/rank',
                name: 'Rank',
                component: () => import('@/views/home/layout/discovery/TabRank.vue'),
              },
              {
                path: '/discovery/artist',
                name: 'Artist',
                component: () => import('@/views/home/layout/discovery/TabArtist.vue'),
              },
              {
                path: '/discovery/newsong',
                name: 'Newsong',
                component: () => import('@/views/home/layout/discovery/TabNewsong/index.vue'),
              },
            ],
          },
          {
            path: '/history',
            name: 'History',
            component: () => import('@/views/home/layout/play-history/index.vue'),
          },
          {
            path: '/daily-music',
            name: 'DailyMusic',
            component: () => import('@/views/home/layout/daily-music/index.vue'),
          },
          {
            path: '/subscription',
            name: 'Subscription',
            component: () => import('@/views/home/layout/subscription/index.vue'),
          },
          {
            path: '/playlist-detail/:id',
            name: 'PlaylistDetail',
            props: true,
            component: () => import('@/views/home/layout/playList-detail/index.vue'),
          },
          {
            path: '/album-detail/:id',
            name: 'AlbumDetail',
            props: true,
            component: () => import('@/views/home/layout/album-detail/index.vue'),
          },
          {
            path: '/artist-detail/:id',
            name: 'ArtistDetail',
            props: true,
            component: () => import('@/views/home/layout/artist-detail/index.vue'),
          },
          {
            path: '/mv-recommend',
            name: 'MvRecommend',
            component: () => import('@/views/home/layout/mv-recommend/index.vue'),
          },
          {
            path: '/mv',
            name: 'Mv',
            component: () => import('@/views/home/layout/mv-page/index.vue'),
          },
          {
            path: '/mv-rank',
            name: 'MvRank',
            component: () => import('@/views/home/layout/mv-rank/index.vue'),
          },
          {
            path: '/search',
            name: 'SearchPage',
            props: true,
            component: () => import('@/views/home/layout/search/index.vue'),
          },
        ],
      },
      {
        path: '/mv-detail/:id',
        name: 'MvDetail',
        props: true,
        component: () => import('@/views/home/mv-detail/index.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
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
