<template>
  <the-scrollbar>
    <div :class="$style.container">
      <div ref="backTopPos" :class="$style.nav">
        <n-popover
          display-directive="show"
          trigger="focus"
          placement="bottom-start"
          style="width: 500px"
          :to="backTopPos"
        >
          <template #trigger>
            <n-button>{{ category.name }}</n-button>
          </template>
          <div :class="$style.categorylist">
            <n-button @click="() => (category = categorylist.all)">
              {{ categorylist.all.name }}
            </n-button>
            <div v-for="(value, key) in categorylist.categories" :key="value">
              <div :class="$style.categoryName">{{ value }}</div>
              <div :class="$style.subCategoryContainer">
                <n-badge
                  v-for="item in categorylist.sub.filter((item) => item.category == key)"
                  :key="item.name"
                  value="火"
                  :show="item.hot"
                >
                  <n-tag style="cursor: pointer" @mousedown="() => (category = item)" round>
                    {{ item.name }}
                  </n-tag>
                </n-badge>
              </div>
            </div>
          </div>
        </n-popover>
        <div>
          <span
            :class="[$style.hottag, tag.name == category.name ? $style.active : '']"
            v-for="tag in tags"
            :key="tag.id"
            @click="category = tag"
            >{{ tag.name }}</span
          >
        </div>
      </div>
      <div v-if="loading" :class="$style.playlistContainer">
        <card-playlist v-for="(item, index) in playlists" :key="index" :playList="item" />
      </div>
      <div :class="$style.spin" v-else="!loading">
        <n-spin size="large" />
      </div>
      <div :class="$style.paginationContainer">
        <n-pagination
          v-model:page="page"
          :page-count="pageCount"
          :page-size="pageSize"
          @update-page="() => backTopPos.scrollIntoView(true)"
        />
      </div>
    </div>
  </the-scrollbar>
</template>

<script>
import api from '@/api/index.js';
import http from '@/api/http';
import { onMounted, reactive, toRefs, watch, ref } from 'vue';

import CardPlaylist from '@/components/CardPlaylist.vue';
import { NPagination, NBadge, NPopover, NTag, NButton, NSpin } from 'naive-ui';

export default {
  name: 'TabPlaylist',
  components: {
    CardPlaylist,
    NPagination,
    NBadge,
    NPopover,
    NTag,
    NButton,
    NSpin,
  },
  setup() {
    const backTopPos = ref({});
    const state = reactive({
      loading: false,
      total: 0,
      page: 1,
      pageCount: 0,
      pageSize: 50,
      playlists: [],
      category: {
        name: '全部',
      },
      order: 'hot',
      categorylist: {
        all: {},
        sub: [],
        categories: {},
      },
      tags: [],
    });

    const getPlaylist = async () => {
      state.loading = false;

      http
        .getPlayLists({
          order: state.order,
          cat: state.category.name,
          offset: (state.page - 1) * state.pageSize,
        })
        .then((res) => {
          state.total = res.total;
          state.pageCount = Math.ceil(state.total / state.pageSize);
          state.playlists = res.playLists;
          setTimeout(() => (state.loading = true), 600);
        });
    };

    const getPlaylistHotTags = async () => {
      const res = await api.playlist.getPlaylistHotTags();
      if (res.code === 200) {
        state.tags = res.tags;
      }
    };

    const getPlaylistCat = async () => {
      const res = await api.playlist.getPlaylistCat();
      if (res.code === 200) {
        state.categorylist.all = res.all;
        state.categorylist.sub = res.sub;
        state.categorylist.categories = res.categories;
      }
    };

    onMounted(() => {
      getPlaylist();
      getPlaylistHotTags();
      getPlaylistCat();
    });

    watch(
      () => [state.category, state.order],
      () => {
        if (state.page === 1) {
          getPlaylist();
        } else {
          state.page = 1;
        }
      },
    );

    watch(
      () => state.page,
      () => {
        getPlaylist();
      },
    );

    return {
      backTopPos,
      ...toRefs(state),
    };
  },
};
</script>

<style module>
.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 20px;
}
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.categorylist {
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  padding: 10px;
}
.categoryName {
  margin-bottom: 8px;
}
.subCategoryContainer {
  display: flex;
  flex-wrap: wrap;
  row-gap: 10px;
  column-gap: 10px;
}
.hottag {
  cursor: pointer;
  display: inline-block;
  text-align: right;
}
.hottag:not(:first-child)::before {
  content: '';
  border-left: 1px solid rgba(0, 0, 0, 0.1);
  margin: 0 10px;
}
.hottag.active {
  color: #18a058;
}
.hottag:hover {
  color: #38b974;
}
.playlistContainer {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  row-gap: var(--gap-lg);
  column-gap: var(--gap-lg);
}
.loading {
  pointer-events: none;
}
.spin {
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.paginationContainer {
  display: flex;
  justify-content: center;
}
</style>
