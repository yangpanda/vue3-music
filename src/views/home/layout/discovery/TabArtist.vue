<template>
  <div>
    <div :class="$style.header">
      <nav :class="$style.nav">
        <span :class="$style.navTitle">语种：</span>
        <span
          v-for="item in areas"
          :class="[$style.navItem, state.area == item.key ? $style.selected : '']"
          @click="state.area = item.key"
          >{{ item.name }}</span
        >
      </nav>
      <nav :class="$style.nav">
        <span :class="$style.navTitle">分类：</span>
        <span
          :class="[$style.navItem, state.type == item.key ? $style.selected : '']"
          v-for="item in types"
          @click="state.type = item.key"
          >{{ item.name }}</span
        >
      </nav>
      <nav :class="$style.nav">
        <span :class="$style.navTitle">筛选：</span>
        <div :class="$style.navItemBox">
          <span
            :class="[$style.navItem, state.initial == -1 ? $style.selected : '']"
            @click="state.initial = -1"
            >热门</span
          >
          <span
            :class="[$style.navItem, state.initial === item ? $style.selected : '']"
            v-for="item in initials"
            :key="item"
            @click="state.initial = item"
            >{{ item }}</span
          >
          <span
            :class="[$style.navItem, state.initial == 0 ? $style.selected : '']"
            @click="state.initial = 0"
            >#</span
          >
        </div>
      </nav>
    </div>
    <div v-infinite-scroll="loadMore" infinite-scroll-distance="10" :class="$style.content">
      <card-artist v-for="item in state.artists" :key="item.id" :artist="item" />
    </div>
    <div :class="$style.loading">
      <n-spin v-if="state.hasMore"></n-spin>
      <span v-else>没有更多了。。。</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabArtist',
};
</script>

<script setup>
import http from '@/api/http.js';
import { reactive, onMounted, watch } from 'vue';
import CardArtist from '@/components/CardArtist.vue';
import { generateBigAlphabet } from '@/utils/';
import { NSpin } from 'naive-ui';

const initials = generateBigAlphabet();
const types = [
  { key: '-1', name: '全部' },
  { key: 1, name: '男歌手' },
  { key: 2, name: '女歌手' },
  { key: 3, name: '乐队' },
];
const areas = [
  { key: -1, name: '全部' },
  { key: 7, name: '华语' },
  { key: 96, name: '欧美' },
  { key: 16, name: '韩国' },
  { key: 0, name: '其他' },
];
const state = reactive({
  artists: [],
  hasMore: true,
  initial: -1,
  area: -1,
  type: -1,
  limit: 96,
  offset: 0,
});

const getArtist = async (
  params = {
    initial: state.initial,
    area: state.area,
    type: state.type,
    limit: state.limit,
    offset: state.offset * state.limit,
  },
) => {
  const { more, artists } = await http.getArtist(params);
  state.hasMore = more;
  state.offset += 1;
  return artists;
};

watch([() => state.area, () => state.type, () => state.initial], () => {
  state.artists = [];
  state.hasMore = true;
  getArtist().then((res) => {
    state.artists = res;
  });
});

onMounted(() => {
  getArtist().then((res) => {
    state.artists = res;
  });
});

const loadMore = () => {
  getArtist().then((res) => {
    state.artists.push(...res);
  });
};
</script>

<style module>
.header {
  margin-bottom: 20px;
}
.nav {
  display: flex;
}
.nav:not(:first-child) {
  margin-top: 10px;
}
.navTitle {
  white-space: nowrap;
}
.navItem {
  cursor: pointer;
  width: 3em;
  text-align: center;
  padding: 0 10px;
}
.navItem:hover {
  color: #18a058;
}
.navItemBox {
  display: flex;
  flex-wrap: wrap;
  column-gap: var(--gap-sm);
  row-gap: var(--gap-sm);
}
.selected {
  color: #18a058;
}
.loading {
  text-align: center;
  padding: 10px;
}
.content {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  row-gap: var(--gap-lg);
  column-gap: var(--gap-lg);
}
</style>
