<template>
  <span :class="[$style.link]" @click.stop="routeActive">
    <slot></slot>
  </span>
</template>

<script>
import useRouterMethods from '@/composables/router-methods.js';
import { NButton } from 'naive-ui';

export default {
  name: 'TheLink',
  components: {
    NButton,
  },
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

<style module>
.link {
  color: #7c7a7a;
  cursor: pointer;
}
.link:hover {
  color: #18a058;
}
</style>
