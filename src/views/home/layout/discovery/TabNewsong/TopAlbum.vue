<template>
  <div :class="$style.topAlbum">
    <div :class="$style.header">
      <div :class="$style.nav">
        <div
          v-for="(value, name) in Object.fromEntries(albumAreaMap)"
          :key="value"
          @click="area = value"
          :class="['cursor-pointer', $style.navItem, area == value ? $style.active : '']"
        >{{ name }}</div>
      </div>
      <div :class="$style.nav">
        <div
          v-for="(value, name) in Object.fromEntries(albumTypeMap)"
          :key="value"
          @click="type = value"
          :class="['cursor-pointer', $style.navItem, type == value ? $style.active : '']"

        >{{ name }}</div>
      </div>
    </div>
    <n-grid v-if="weekAlbums" x-gap="20" y-gap="20" :cols="5">
      <n-grid-item v-for="(item, index) in weekAlbums" :key="index">
        <div class="album-card pointer" @click="toPlaylistDetail(item.id)">
          <the-image :src="item.picUrl + '?param=200y200'" round="large" />
          <div class="album-name">{{ item.name }}</div>
        </div>
      </n-grid-item>
    </n-grid>
    <n-grid x-gap="20" y-gap="20" :cols="5">
      <n-grid-item v-for="(item, index) in monthAlbums" :key="index">
        <div class="album-card pointer" @click="toPlaylistDetail(item.id)">
          <the-image :src="item.picUrl + '?param=200y200'" round="large" />
          <div class="album-name">{{ item.name }}</div>
        </div>
      </n-grid-item>
    </n-grid>
  </div>
</template>

<script setup>
import { useLoadingBar, NGrid, NGridItem } from "naive-ui";

import { ref, watchEffect, reactive } from "@vue/runtime-core";
import { useRouter } from "vue-router"
import * as playlist from "@/api/service/playlist.js";

const router = useRouter();
const showSpin = ref(true)

const albumAreaMap = new Map([
  ["全部", "ALL"],
  ["华语", "ZH"],
  ["欧美", "EA"],
  ["韩国", "KR"],
  ["日本", "JP"],
]);
const albumTypeMap = new Map([
  ["全部", "new"],
  ["热门", "hot"],
]);
const area = ref("ALL");
const type = ref("new");
const year = ref(new Date().getFullYear());
const month = ref(new Date().getMonth() + 1);
const offset = ref(0);
const limit = ref(30);

const weekAlbums = ref([]);
const monthAlbums = ref([]);

const getTopAlbum = async (params) => {
  playlist.getTopAlbum(params).then((res) => {
    if (res.code === 200) {
      weekAlbums.value = res.weekData;
      monthAlbums.value = res.monthData;
    }
  });
};

watchEffect(() => {
  getTopAlbum({
    area: area.value,
    type: type.value,
    year: year.value,
    month: month.value,
    offset: offset.value,
    limit: limit.value,
  });
});

function toPlaylistDetail(id) {
  router.push(`/album-detail/${id}`)
}
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
</style>
