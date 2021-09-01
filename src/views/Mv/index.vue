<template>
  <div class="wrapper">
    <div class="content">
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
            >
              {{ value }}
            </div>
          </nav>
        </template>
      </the-section>
      <the-section title="网易出品" cols="4">
        <template #cards>
          <card-mv
            v-for="(item, index) in neteaseMvs"
            :key="index"
            :mv="item"
          />
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
            >
              {{ value }}
            </div>
          </nav>
        </template>
      </the-section>
    </div>
  </div>
</template>

<script setup>
import TheSection from "@/components/TheSection.vue";
import CardMv from "@/components/CardMv.vue";
import { useLoadingBar } from "naive-ui";

import api from "@/api/index.js";

import { onMounted, ref, watchPostEffect } from "vue";

const loadingBar = useLoadingBar();

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
.wrapper {
  margin: 20px;

  .content {
    display: grid;
    row-gap: 20px;
    min-width: 800px;
    max-width: 1100px;
    margin: 0 auto;
  }
}
.nav-active {
  background-color: green;
}
</style>
