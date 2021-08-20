<template>
  <div class="playlist">
    <div class="nav">
      <n-popover display-directive="show" trigger="focus" placement="bottom-start" style="width: 800px">
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
                @click.stop.prevent="handleCatSelected(subitem)"
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
          :options="tagMenuOptions"
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
import { onMounted, ref, watchEffect } from "vue";

import * as api from "@/api/service/playlist.js";

import Playlist from "@/model/Playlist.js";

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
    const playlists = ref([]);
    const hottags = ref([]);
    const categories = ref({});
    const cat = ref("全部");
    const tagMenuOptions = ref([]);

    const getPlaylist = async (param) => {
      const res = await api.getPlaylist(param);
      let tmpPlaylists = [];
      res.playlists.forEach((playlist) => {
        tmpPlaylists.push(new Playlist(playlist));
      });
      playlists.value = tmpPlaylists;
    };

    watchEffect(() => {
      getPlaylist({
        order: "hot",
        cat: cat.value,
      });
    });

    const getHotPlaylistTags = async () => {
      const res = await api.getHotPlaylistTags();
      hottags.value = res.tags.map((tag) => tag.name);
      tagMenuOptions.value = hottags.value.map((tag) => {
        return {
          label: tag,
          key: tag,
        };
      });
    };

    const getPlaylistCat = async () => {
      const res = await api.getPlaylistCat();
      if (res.code === 200) {
        for (let key in res.categories) {
          let sub = res.sub
            .filter((item) => item.category == key)
            .map((item) => item.name);
          categories.value[key] = {
            cat: res.categories[key],
            sub,
          };
        }
      }
    };

    onMounted(() => getHotPlaylistTags());
    onMounted(() => getPlaylistCat());

    return {
      playlists,
      hottags,
      tagMenuOptions,
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
