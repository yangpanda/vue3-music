<template>
  <the-scrollbar>
    <div :class="$style.wrap">
      <n-tabs type="line">
        <n-tab-pane v-for="tab in tabs" :name="tab.name" :tab="tab.name">
          <component :is="tab.component"></component>
        </n-tab-pane>
      </n-tabs>
    </div>
  </the-scrollbar>
</template>

<script>
import { NScrollbar, NTabs, NTabPane } from 'naive-ui';
import { defineAsyncComponent } from 'vue';

const tabs = [
  {
    name: '专辑',
    component: defineAsyncComponent(() => import('./TabAlbum.vue')),
  },
  {
    name: '歌手',
    component: defineAsyncComponent(() => import('./TabArtist.vue')),
  },
];

export default {
  name: 'Subscription',
  components: {
    NScrollbar,
    NTabs,
    NTabPane,
  },
  setup() {
    return {
      tabs,
    };
  },
};
</script>

<style module>
.wrap {
  padding: 0 20px;
}
</style>
