<template>
  <div class="nav">
    <n-popover
      display-directive="show"
      trigger="focus"
      placement="bottom-start"
      style="width: 800px"
    >
      <template #trigger>
        <n-button>{{ cat.name }}</n-button>
      </template>
      <n-space vertical>
        <n-thing @mousedown="cat = all" style="cursor: pointer">
          <template #header>{{ all.name }}</template>
        </n-thing>
        <n-thing v-for="(value, key) in popData" :key="key">
          <template #header>{{ value.name }}</template>
          <n-space>
            <n-badge
              v-for="(tag, index) in value.tags"
              :key="index"
              value="火"
              :show="tag.hot"
            >
              <n-tag
                style="cursor: pointer"
                @mousedown="
                  cat = tag;
                  page = 1;
                "
                round
              >
                {{ tag.name }}
              </n-tag>
            </n-badge>
          </n-space>
        </n-thing>
      </n-space>
    </n-popover>
    <div class="hot-tags">
      <span style="white-space: nowrap">热门标签:</span>
      <n-tag
        v-for="(item, index) in hotTags"
        :key="index"
        checkable
        :checked="cat.name === item.name"
        @click="cat = item"
      >
        {{ item.name }}
      </n-tag>
    </div>
  </div>
  <div :class="{loading: loading}">
    <n-grid :x-gap="20" :y-gap="15" :cols="5">
      <n-grid-item v-for="(item, index) in playlists" :key="index">
        <card-playlist :playlist="item" />
      </n-grid-item>
    </n-grid>
  </div>
  <n-pagination
    v-model:page="page"
    :page-count="pageCount"
    style="justify-content: center"
    @update-page="scrollToTop()"
  />
</template>

<script setup>
import api from "@/api/index.js";
import Playlist from "@/model/Playlist.js";
import { ref, watchPostEffect, onMounted, inject } from "vue";
import axios from "axios";

import CardPlaylist from "@/components/CardPlaylist.vue";
import {
  NGrid,
  NGridItem,
  NThing,
  NPagination,
  NBadge,
  NSpin,
  useLoadingBar,
} from "naive-ui";

const scrollToTop = inject("scrollToTop");

const loadingBar = useLoadingBar();
const loading = ref(true)
const hotTags = ref([]);
const playlists = ref([]);
const popData = ref({});
const cat = ref({});
const all = ref({});

const page = ref(1);
const pageCount = ref(0);

onMounted(() => {
  loadingBar.start();

  Promise.allSettled([
    api.playlist.getPlaylistHotTags(),
    api.playlist.getPlaylistCat(),
  ]).then((results) => {
    const [hotTagsData, categoriesData] = results.map((item) => {
      if (item.status === "fulfilled") {
        return item.value;
      }
      if (item.status === "rejected") {
        console.log("rejected");
      }
    });

    hotTags.value = hotTagsData.tags;
    cat.value = categoriesData.all;
    all.value = categoriesData.all;
    popData.value = Object.fromEntries(
      Object.entries(categoriesData.categories).map(([key, value]) => {
        const tags = categoriesData.sub.filter((item) => item.category == key);

        return [key, { name: value, tags }];
      })
    );

    watchPostEffect(() => {
      loadingBar.start();
      loading.value = true;

      api.playlist
        .getPlaylist({
          order: "hot",
          cat: cat.value.name,
          offset: (page.value - 1) * 50,
        })
        .then((response) => {
          if (response.code === 200) {
            const judge = response.total % 50;
            const count = Math.floor(response.total / 50);
            pageCount.value = judge === 0 ? count : count + 1;

            playlists.value = response.playlists.map(
              (item) => new Playlist(item)
            );
          }

          loadingBar.finish();
          loading.value = false;
        });
    });
  });
});
</script>

<style scoped>
.nav {
  display: flex;
  align-items: center;
  column-gap: 20px;
}

.hot-tags {
  display: flex;
  align-items: center;
  column-gap: 20px;
}
.loading {
  pointer-events: none;
  opacity: 50%;
}
</style>
