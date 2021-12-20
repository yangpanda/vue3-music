<template>
  <div :class="$style.subscription">
    <n-scrollbar>
      <n-tabs type="line">
        <n-tab-pane v-for="tab in tabs" :name="tab.name" :tab="tab.name">
          <component :is="tab.component"></component>
        </n-tab-pane>
      </n-tabs>
    </n-scrollbar>
  </div>
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
.subscription {
  height: 100%;
}
</style>
