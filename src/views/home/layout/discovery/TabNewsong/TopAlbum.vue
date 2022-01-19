<template>
  <div :class="$style.topAlbum">
    <div :class="$style.header">
      <div :class="$style.nav">
        <div
          v-for="(value, name) in Object.fromEntries(areaMap)"
          :key="value"
          @click="area = value"
          :class="['cursor-pointer', $style.navItem, area == value ? $style.active : '']"
        >
          {{ name }}
        </div>
      </div>
      <div :class="$style.nav">
        <div
          v-for="(value, name) in Object.fromEntries(typeMap)"
          :key="value"
          @click="type = value"
          :class="['cursor-pointer', $style.navItem, type == value ? $style.active : '']"
        >
          {{ name }}
        </div>
      </div>
    </div>
    <div v-if="loading" :class="$style.spinContainer">
      <n-spin></n-spin>
    </div>
    <n-grid v-else x-gap="20" y-gap="20" :cols="5">
      <n-grid-item v-for="(item, index) in monthAlbums" :key="item.id">
        <div :class="$style.albumCard" @click="toAlbumDetail(item.id)">
          <the-image :src="item.picUrl" radius="8" />
          <div>{{ item.name }}</div>
        </div>
      </n-grid-item>
    </n-grid>
  </div>
</template>

<script>
import { NGrid, NGridItem, NSpin } from 'naive-ui';
import { ref, toRefs, watchEffect, reactive } from '@vue/runtime-core';
import useRouterMethods from '@/composables/useRouterMethods';
import api from '@/api';

const areaMap = new Map([
  ['全部', 'ALL'],
  ['华语', 'ZH'],
  ['欧美', 'EA'],
  ['韩国', 'KR'],
  ['日本', 'JP'],
]);
const typeMap = new Map([
  ['全部', 'new'],
  ['热门', 'hot'],
]);

export default {
  name: 'TopAlbum',
  components: {
    NGrid,
    NGridItem,
    NSpin,
  },
  setup() {
    const loading = ref(true);
    const monthAlbums = ref([]);
    const state = reactive({
      area: 'ALL',
      type: 'new',
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
    });

    const { toAlbumDetail } = useRouterMethods();

    const getTopAlbum = async (params) => {
      loading.value = true;
      const res = await api.playlist.getTopAlbum(params);
      if (res.code === 200) {
        monthAlbums.value = res.monthData;
        loading.value = false;
      }
    };

    watchEffect(() => {
      getTopAlbum({
        area: state.area,
        type: state.type,
        year: state.year,
        month: state.month,
      });
    });

    return {
      loading,
      monthAlbums,
      areaMap,
      typeMap,
      toAlbumDetail,
      ...toRefs(state),
    };
  },
};
</script>

<style module>
.topAlbum {
  display: flex;
  flex-direction: column;
  row-gap: var(--gap-lg);
}
.header {
  display: flex;
  justify-content: space-between;
}
.nav {
  display: flex;
  column-gap: var(--gap-lg);
}
.active {
  color: green;
}
.spinContainer {
  margin: 20px 0;
  display: flex;
  justify-content: center;
}
.albumCard {
  cursor: pointer;
}
</style>
