<template>
  <div class="container">
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
          <n-thing v-for="(item, index) in categories" :key="index">
            <template #header>{{ item.cat }}</template>
            <n-space>
              <n-tag
                v-for="(subitem, subindex) in item.sub"
                :key="subindex"
                style="cursor: pointer"
                @mousedown="cat = subitem"
                round
              >
                {{ subitem.name }}
              </n-tag>
            </n-space>
          </n-thing>
        </n-space>
      </n-popover>
      <div>
        <span>热门标签：</span>
        <n-menu
          mode="horizontal"
          :options="hotTagsMenuOption"
          v-model:value="cat.name"
        ></n-menu>
      </div>
    </div>
    <n-grid :x-gap="20" :y-gap="15" :cols="5">
      <n-grid-item v-for="(item, index) in playlists" :key="index">
        <card-playlist :playlist="item" />
      </n-grid-item>
    </n-grid>
    <n-pagination v-model:page="page" :page-count="pageCount" style="justify-content: center"/>
  </div>
</template>

<script>
import { ref, watchPostEffect } from "vue";

import {
  usePlaylistHotTags,
  usePlaylistCat,
  usePlaylistGet,
} from "@/composables/usePlaylist.js";

import CardPlaylist from "@/components/CardPlaylist.vue";
import { NGrid, NGridItem, NMenu, NThing, NPagination } from "naive-ui";

export default {
  name: "Playlist",
  components: {
    CardPlaylist,
    NGrid,
    NGridItem,
    NMenu,
    NThing,
    NPagination,
  },
  data() {
    return {};
  },
  setup() {
    const { hotTags, hotTagsMenuOption } = usePlaylistHotTags();
    const { playlists, getPlaylist } = usePlaylistGet();
    const { cat, categories } = usePlaylistCat();

    const page = ref(1)
    const pageCount = ref(0)
    watchPostEffect(() => {
      const judge = Number(cat.value.count) % 50
      const count = Math.floor(cat.value.count / 50)
      pageCount.value = judge === 0 ? count : count + 1

      console.log('exec');
      getPlaylist({
        order: "hot",
        cat: cat.value.name,
        offset: page.value * 50
      })
    })

    return {
      playlists,
      hotTags,
      hotTagsMenuOption,
      categories,
      cat,
      page,
      pageCount
    };
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  row-gap: 20px;
}

.nav {
  display: flex;
  align-items: center;
  column-gap: 20px;
}
</style>
