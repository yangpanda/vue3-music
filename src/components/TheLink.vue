<template>
  <n-button text tag="a" type="primary" @click="routeActive">
    <slot></slot>
  </n-button>
</template>

<script>
import useRouterMethods from '@/composables/router-methods.js';

export default {
  name: 'TheLink',
  props: {
    params: null,
  },
  setup({ params }) {
    const { toAlbumDetail, toArtistDetail } = useRouterMethods();
    const pageMap = new Map([
      ['AlbumDetail', toAlbumDetail],
      ['ArtistDetail', toArtistDetail],
    ]);

    const routeActive = () => {
      const fun = pageMap.get(params.name);
      fun(params.id);
    };

    return {
      routeActive,
    };
  },
};
</script>
