<template>
  <div :class="$style.searchPage">
    <the-scrollbar>
      <div :class="$style.wrap">
        <h3>搜索 {{ words }}</h3>
        <n-tabs type="line">
          <n-tab-pane v-for="item in tabs" :name="item.tab" :tab="item.tab">
            <component :is="item.component" :keywords="words"></component>
          </n-tab-pane>
        </n-tabs>
      </div>
    </the-scrollbar>
  </div>
</template>

<script>
export default {
  name: 'SearchPage',
};
</script>
<script setup>
import { defineAsyncComponent } from '@vue/runtime-core';
import { NTabs, NTabPane } from 'naive-ui';

const props = defineProps({
  words: '',
});

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
</script>

<style module>
.searchPage {
  height: 100%;
}
.wrap {
  padding: 0 20px 20px 20px;
}
</style>
