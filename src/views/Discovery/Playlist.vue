<template>
  <div class="space-y-5">
    <div class="flex justify-between items-center">
      <n-popover
        display-directive="show"
        trigger="focus"
        placement="bottom-start"
        style="width: 800px"
      >
        <template #trigger>
          <the-button>{{ cat.name }}</the-button>
        </template>
        <div class="space-y-4">
          <div class="text-base cursor-pointer" @mousedown="cat = all">{{ all.name }}</div>
          <div class="space-y-3" v-for="(value, key) in popData" :key="key">
            <div class="text-base cursor-pointer">{{ value.name }}</div>
            <div class="flex flex-wrap gap-x-4 gap-y-3">
              <n-badge v-for="(tag, index) in value.tags" :key="index" value="火" :show="tag.hot">
                <n-tag
                  style="cursor: pointer"
                  @mousedown="
                  cat = tag;
                  page = 1;
                  "
                  round
                >{{ tag.name }}</n-tag>
              </n-badge>
            </div>
          </div>
        </div>
      </n-popover>
      <the-nav>
        <tag
          v-for="(tag, index) in hotTags"
          :key="index"
          text
          :isActive="cat.name === tag.name"
          @click="cat = tag"
        >{{ tag.name }}</tag>
      </the-nav>
    </div>
    <div
      class="grid grid-cols-5 gap-x-4 gap-y-4"
      :class="{ 'pointer-events-none opacity-50': loading }"
    >
      <card-playlist v-for="(item, index) in playlists" :key="index" :playlist="item" />
    </div>
    <div class="flex justify-center">
      <n-pagination v-model:page="page" :page-count="pageCount" @update-page="backTop()" />
    </div>
  </div>
</template>

<script setup>
import TheNav from '@/components/Common/Nav/TheNav.vue'
import Tag from '@/components/Common/Tag.vue'

import api from "@/api/index.js";
import Playlist from "@/model/Playlist.js";
import { ref, watchPostEffect, onMounted, inject } from "vue";

import CardPlaylist from "@/components/CardPlaylist.vue";
import {
  NPagination,
  NBadge,
  useLoadingBar,
} from "naive-ui";

const backTop = inject("backTop");

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