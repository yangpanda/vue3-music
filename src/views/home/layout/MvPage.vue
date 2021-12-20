<template>
  <n-scrollbar>
    <div ref="contentRef" :class="$style.mvWrap">
      <the-section title="最新MV" cols="4">
        <template #cards>
          <card-mv v-for="(item, index) in newMvs" :key="index" :mv="item" />
        </template>
        <template #nav>
          <nav :class="$style.nav">
            <span
              v-for="(value, index) in Areas"
              :key="index"
              @click="newMvArea = value"
              :class="[$style.navItem, newMvArea === value ? $style.active : '']"
              >{{ value }}</span
            >
          </nav>
        </template>
      </the-section>
      <the-section title="网易出品" cols="4">
        <template #cards>
          <card-mv v-for="(item, index) in neteaseMvs" :key="index" :mv="item" />
        </template>
      </the-section>
      <the-section title="MV排行榜" cols="4">
        <template #cards>
          <card-mv
            v-for="(value, index) in topMvs"
            :key="index"
            :mv="value"
            @click="topMvArea = value"
            :class="{ 'capsule-button': topMvArea === value }"
          />
        </template>
        <template #nav>
          <nav :class="$style.nav">
            <span
              v-for="(value, index) in Areas"
              :key="index"
              @click="topMvArea = value"
              :class="[$style.navItem, topMvArea === value ? $style.active : '']"
              >{{ value }}</span
            >
          </nav>
        </template>
      </the-section>
    </div>
    <n-back-top v-if="contentRef" :right="20" :bottom="100" :to="contentRef"></n-back-top>
  </n-scrollbar>
</template>

<script setup>
import TheSection from '@/components/TheSection.vue';
import CardMv from '@/components/CardMv.vue';

import api from '@/api/index.js';

import { onMounted, ref, watchPostEffect } from 'vue';

const contentRef = ref(null);

const Areas = ['内地', '港台', '欧美', '日本', '韩国'];
const newMvArea = ref('内地');
const topMvArea = ref('内地');

const newMvs = ref([]);
const neteaseMvs = ref([]);
const topMvs = ref([]);

onMounted(() => {
  Promise.all([
    api.mv.getNew({
      area: newMvArea.value,
      limit: 8,
    }),
    api.mv.getNetease({
      limit: 8,
    }),
    api.mv.getTop({
      area: topMvArea.value,
      limit: 12,
    }),
  ]).then((results) => {
    [newMvs.value, neteaseMvs.value, topMvs.value] = results.map((item) => item.data);

    watchPostEffect(() => {
      api.mv
        .getTop({
          area: topMvArea.value,
          limit: 12,
        })
        .then((response) => {
          topMvs.value = response.data;
        });
    });

    watchPostEffect(() => {
      api.mv
        .getNew({
          area: newMvArea.value,
          limit: 8,
        })
        .then((response) => {
          newMvs.value = response.data;
        });
    });
  });
});
</script>

<style module>
.mvWrap {
  display: flex;
  flex-direction: column;
  row-gap: var(--gap-lg);
  max-width: 110rem;
  margin: 0 auto;
  padding: 2rem;
}
.nav {
  display: flex;
  column-gap: var(--gap-lg);
  align-items: center;
}
.navItem {
  cursor: pointer;
}
.active {
  width: 2em;
  background-color: rgba(3, 105, 3, 0.5);
  border-radius: 9999rem;
  padding: 0 10px;
}
</style>
