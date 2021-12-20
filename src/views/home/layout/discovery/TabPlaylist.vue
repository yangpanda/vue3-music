<template>
  <div :class="$style.tabPlaylist">
    <div :class="$style.nav">
      <n-popover display-directive="show" trigger="focus" placement="bottom-start" style="width: 500px">
        <template #trigger>
          <span>{{ cat.name }}</span>
        </template>
        <div :class="$style.popContent">
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
                  >{{ tag.name }}</n-tag
                >
              </n-badge>
            </div>
          </div>
        </div>
      </n-popover>
      <div :class="$style.navRight">
        <span v-for="(tag, index) in hotTags" :key="index" @click="cat = tag">{{ tag.name }}</span>
      </div>
    </div>
    <div :class="[$style.content, loading ? $style.loading : '']">
      <card-playlist v-for="(item, index) in playlists" :key="index" :playlist="item" />
    </div>
    <div :class="$style.paginationBox">
      <n-pagination v-model:page="page" :page-count="pageCount" @update-page="backToTop()" />
    </div>
  </div>
</template>

<script setup>
import api from '@/api/index.js';
import Playlist from '@/model/Playlist.js';
import { ref, watchPostEffect, onMounted, inject } from 'vue';

import CardPlaylist from '@/components/CardPlaylist.vue';
import { NPagination, NBadge, NPopover } from 'naive-ui';

// inject
const backToTop = inject('backToTop');

const loading = ref(true);
const hotTags = ref([]);
const playlists = ref([]);
const popData = ref({});
const cat = ref({});
const all = ref({});

const page = ref(1);
const pageCount = ref(0);

onMounted(() => {
  Promise.allSettled([api.playlist.getPlaylistHotTags(), api.playlist.getPlaylistCat()]).then((results) => {
    const [hotTagsData, categoriesData] = results.map((item) => {
      if (item.status === 'fulfilled') {
        return item.value;
      }
      if (item.status === 'rejected') {
      }
    });

    hotTags.value = hotTagsData.tags;
    cat.value = categoriesData.all;
    all.value = categoriesData.all;
    popData.value = Object.fromEntries(
      Object.entries(categoriesData.categories).map(([key, value]) => {
        const tags = categoriesData.sub.filter((item) => item.category == key);

        return [key, { name: value, tags }];
      }),
    );

    watchPostEffect(() => {
      loading.value = true;

      api.playlist
        .getPlaylist({
          order: 'hot',
          cat: cat.value.name,
          offset: (page.value - 1) * 50,
        })
        .then((response) => {
          if (response.code === 200) {
            const judge = response.total % 50;
            const count = Math.floor(response.total / 50);
            pageCount.value = judge === 0 ? count : count + 1;

            playlists.value = response.playlists.map((item) => new Playlist(item));
          }

          loading.value = false;
        });
    });
  });
});
</script>

<style module>
.tabPlaylist {
  display: flex;
  flex-direction: column;
  row-gap: var(--gap-lg);
}
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.popContent {
  display: flex;
  row-gap: 2rem;
}

.navRight {
  display: flex;
  column-gap: var(--gap-sm);
}
.content {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  row-gap: var(--gap-lg);
  column-gap: var(--gap-lg);
}
.loading {
  pointer-events: none;
}

.paginationBox {
  display: flex;
  justify-content: center;
}
</style>
