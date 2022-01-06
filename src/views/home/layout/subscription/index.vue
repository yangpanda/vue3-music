<template>
  <the-scrollbar>
    <div v-if="loginStatus" :class="$style.wrap">
      <n-tabs type="line">
        <n-tab-pane v-for="tab in tabs" :name="tab.name" :tab="tab.name">
          <component :is="tab.component"></component>
        </n-tab-pane>
      </n-tabs>
    </div>
    <div v-else :class="$style.message">
      <n-result status="info" title="还没有登录哦" description="在这个年代，信息就是金钱，金钱就是信息。">
      </n-result>
    </div>
  </the-scrollbar>
</template>

<script>
import { NScrollbar, NTabs, NTabPane, NResult } from 'naive-ui';
import { defineAsyncComponent } from 'vue';
import { useStore } from 'vuex';
import { computed } from 'vue';

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
    NResult,
  },
  setup() {
    const store = useStore();
    const loginStatus = computed(() => store.state.user.loginStatus);

    return {
      tabs,
      loginStatus,
    };
  },
};
</script>

<style module>
.wrap {
  padding: 0 20px;
}
.message {
  padding-top: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
