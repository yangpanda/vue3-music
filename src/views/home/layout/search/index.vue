<template>
  <div :class="$style.searchPage">
    <n-scrollbar>
      <n-tabs type="line">
        <n-tab-pane v-for="item in tabs" :name="item.tab" :tab="item.tab">
          <component :is="item.component" :keywords="words"></component>
        </n-tab-pane>
      </n-tabs>
    </n-scrollbar>
  </div>
</template>

<script>
import { defineAsyncComponent } from '@vue/runtime-core';
import { NTabs, NTabPane, NScrollbar } from 'naive-ui';

export default {
  props: {
    words: '',
  },
  components: {
    NTabs,
    NTabPane,
    NScrollbar,
  },
  setup() {
    const tabs = [
      {
        tab: '单曲',
        component: defineAsyncComponent(() => import('./components/TabSong.vue')),
      },
      // {
      //   tab: '专辑',
      //   component: defineAsyncComponent(() => import('./components/TabAlbum.vue'))
      // },
      // {
      //   tab: '歌手',
      //   type: 100,
      //   component: defineAsyncComponent(() => import('./components/TabArtist.vue'))
      // },
      // {
      //   tab: '歌单',
      //   component: defineAsyncComponent(() => import('./components/TabPlaylist.vue'))
      // },
      // {
      //   tab: '用户',
      //   component: defineAsyncComponent(() => import('./components/TabUser.vue'))
      // },
      // {
      //   tab: 'MV',
      //   component: defineAsyncComponent(() => import('./components/TabMv.vue'))
      // },
    ];

    return {
      tabs,
    };
  },
};
</script>

<style module>
.searchPage {
  height: 100%;
  background-color: ightgray;
}
</style>
