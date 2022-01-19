<template>
  <the-scrollbar>
    <div class="container">
      <h2>全部MV</h2>
      <div class="nav">
        <div class="navItem" v-for="item in navs">
          <span>{{ item.name }}：</span>
          <span
            :class="{ active: child === state[item.type] }"
            v-for="child in item.childs"
            @click="() => (state[item.type] = child)"
            >{{ child }}</span
          >
        </div>
      </div>
      <div
        class="content"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="state.busy"
        infinite-scroll-distance="10"
      >
        <card-mv v-for="item in state.mvs" :key="item.id" :mv="item"></card-mv>
      </div>
    </div>
  </the-scrollbar>
</template>

<script>
export default {
  name: 'MvPage',
};
</script>

<script setup>
import { reactive, watch } from 'vue';
import CardMv from '@/components/CardMv.vue';
import http from '@/api/http.js';
import { useRoute } from 'vue-router';

const navs = [
  {
    name: '地区',
    type: 'area',
    childs: ['全部', '内地', '欧美', '日本', '韩国'],
  },
  {
    name: '类型',
    type: 'type',
    childs: ['全部', '官方版', '原声', '现场版', '网易出品'],
  },
  {
    name: '排序',
    type: 'order',
    childs: ['上升最快', '最热', '最新'],
  },
];

const state = reactive({
  area: '全部',
  order: '上升最快',
  type: '全部',
  limit: 32,
  offset: 0,
  mvs: [],
  hasMore: true,
  busy: false,
});

const route = useRoute();
const params = route.params;
for (const key in params) {
  if (params[key]) {
    state[key] = params[key];
  }
}

const getAll = async (offset = 0) => {
  http
    .getAllMv({
      area: state.area,
      order: state.order,
      type: state.type,
      limit: state.limit,
      offset,
    })
    .then((res) => {
      const { mvs, hasMore } = res;
      state.mvs.push(...mvs);
      state.hasMore = hasMore;
    });
};

const loadMore = () => {
  if (state.hasMore) {
    state.busy = true;
    getAll(state.offset++ * state.limit);
    state.busy = false;
  }
};

watch([() => state.area, () => state.type, () => state.order], () => {
  state.offset = 0;
  state.mvs = [];
  getAll();
});
</script>

<style scoped>
.active {
  color: #18a058;
}
.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;
}
.nav {
  margin-bottom: 20px;
}
.nav > :not(:first-child) {
  margin-top: 10px;
}
.navItem > span:not(:nth-child(-n + 1)) {
  display: inline-block;
  position: relative;
  width: 8em;
  cursor: pointer;
  text-align: center;
}
.navItem > span:not(:nth-child(-n + 1)):hover {
  color: #18a058;
}
.navItem > span:not(:nth-child(-n + 2))::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  height: 1em;
  border: 1px solid rgba(0, 0, 0, 0.1);
}
.content {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  row-gap: 10px;
  column-gap: 10px;
}
</style>
