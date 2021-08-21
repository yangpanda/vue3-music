<template>
  <div class="playlist">
    <div class="nav">
      <n-popover
        display-directive="show"
        trigger="focus"
        placement="bottom-start"
        style="width: 800px"
      >
        <template #trigger>
          <n-button>{{ cat }}</n-button>
        </template>
        <n-space vertical>
          <n-thing v-for="(item, index) in categories" :key="index">
            <template #header>{{ item.cat }}</template>
            <n-space>
              <n-tag
                v-for="(subitem, subindex) in item.sub"
                :key="subindex"
                class="sub-item"
                style="cursor: pointer"
                @mousedown="handleCatSelected(subitem)"
                round
              >
                {{ subitem }}
              </n-tag>
            </n-space>
          </n-thing>
        </n-space>
      </n-popover>
      <div class="nav-tag">
        <span>热门标签：</span>
        <n-menu
          mode="horizontal"
          :options="hotTagsMenuOption"
          v-model:value="cat"
        ></n-menu>
      </div>
    </div>
    <n-grid :x-gap="20" :y-gap="20" :cols="5">
      <n-grid-item v-for="(item, index) in playlists" :key="index">
        <card-playlist :playlist="item" />
      </n-grid-item>
    </n-grid>
  </div>
</template>

<script>
import { ref, watchEffect } from "vue";

import {
  usePlaylistHotTags,
  usePlaylistCat,
  usePlaylistGet,
} from "@/composables/usePlaylist.js";

import CardPlaylist from "@/components/CardPlaylist.vue";
import { NGrid, NGridItem, NMenu, NThing } from "naive-ui";

export default {
  name: "Playlist",
  components: {
    CardPlaylist,
    NGrid,
    NGridItem,
    NMenu,
    NThing,
  },
  data() {
    return {};
  },
  setup() {
    const { hotTags, hotTagsMenuOption } = usePlaylistHotTags();
    const { playlists, getPlaylist } = usePlaylistGet();
    const { categories } = usePlaylistCat();
    const cat = ref("全部");

    watchEffect(() => {
      getPlaylist({
        order: "hot",
        cat: cat.value,
      });
    });

    return {
      playlists,
      hotTags,
      hotTagsMenuOption,
      categories,
      cat,
    };
  },
  methods: {
    handleCatSelected(cat) {
      this.cat = cat;
    },
  },
};
</script>

<style lang="scss" scoped>
.nav {
  display: flex;
  align-items: center;
  column-gap: 20px;
  margin-bottom: 20px;
}
</style>
