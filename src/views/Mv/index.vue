<template>
  <n-scrollbar>
    <div ref="contentRef" class="max-w-screen-lg mx-auto px-5 my-5 space-y-5">
      <the-section title="最新MV" cols="4">
        <template #cards>
          <card-mv v-for="(item, index) in newMvs" :key="index" :mv="item" />
        </template>
        <template #nav>
          <nav class="flex col-gap-20 align-center">
            <div
              class="nav-item pointer"
              v-for="(value, index) in Areas"
              :key="index"
              @click="newMvArea = value"
              :class="{ 'capsule-button': newMvArea === value }"
            >{{ value }}</div>
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
          <nav class="flex col-gap-20 align-center">
            <div
              class="pointer nav-item"
              v-for="(value, index) in Areas"
              :key="index"
              @click="topMvArea = value"
              :class="{ 'capsule-button': topMvArea === value }"
            >{{ value }}</div>
          </nav>
        </template>
      </the-section>
    </div>
    <n-back-top v-if="contentRef" :right="20" :bottom="100" :to="contentRef"></n-back-top>
  </n-scrollbar>
</template>

<script setup>
import TheSection from "@/components/TheSection.vue";
import CardMv from "@/components/CardMv.vue";
import { useLoadingBar } from "naive-ui";

import api from "@/api/index.js";

import { onMounted, ref, watchPostEffect } from "vue";

const loadingBar = useLoadingBar();
const contentRef = ref(null)

const Areas = ["内地", "港台", "欧美", "日本", "韩国"];
const newMvArea = ref("内地");
const topMvArea = ref("内地");

const newMvs = ref([]);
const neteaseMvs = ref([]);
const topMvs = ref([]);

onMounted(() => {
  loadingBar.start();

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
    [newMvs.value, neteaseMvs.value, topMvs.value] = results.map(
      (item) => item.data
    );
    loadingBar.finish();

    watchPostEffect(() => {
      loadingBar.start();

      api.mv
        .getTop({
          area: topMvArea.value,
          limit: 12,
        })
        .then((response) => {
          topMvs.value = response.data;
          loadingBar.finish();
        });
    });

    watchPostEffect(() => {
      loadingBar.start();

      api.mv
        .getNew({
          area: newMvArea.value,
          limit: 8,
        })
        .then((response) => {
          newMvs.value = response.data;
          loadingBar.finish();
        });
    });
  });
});
</script>

<style lang="scss" scoped>
.nav-active {
  background-color: green;
}
</style>
