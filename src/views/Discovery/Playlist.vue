<template>
  <div class="playlist">
    <div class="tag-nav">
      <the-button class="title">
        全部歌单
        <svg-icon iconName="#icon-arrow-down" size="12" />
        <template #drop-menu>
          <div class="drop-menu">
            <div class="cat" v-for="(item, index) in categories" :key="index">
              <div class="title">{{ item.cat }}</div>
              <div class="sub">
                <n-tag
                  round
                  v-for="(subitem, subindex) in item.sub"
                  :key="subindex"
                  class="sub-item"
                  style="cursor: pointer;"
                  @click="() => cat = subitem"
                >
                  {{ subitem }}
                </n-tag>
              </div>
            </div>
          </div>
        </template>
      </the-button>
      <div class="tags">
        <div>热门标签：</div>
        <div
          class="tag"
          v-for="(item, index) in hottags"
          :key="index"
          @click="updateCat(item)"
        >
          {{ item }}
        </div>
      </div>
    </div>
    <div class="playlist-wrapper">
      <card-playlist
        v-for="(item, index) in playlists"
        :key="index"
        :playlist="item"
      />
    </div>
  </div>
</template>

<script>
import { onMounted, ref, watchEffect } from "vue";

import * as api from "@/api/service/playlist.js";

import Playlist from "@/model/Playlist.js";

import CardPlaylist from "@/components/CardPlaylist.vue";

export default {
  name: "Playlist",
  components: {
    CardPlaylist,
  },
  data() {
    return {};
  },
  setup() {
    const playlists = ref([]);
    const hottags = ref([]);
    const categories = ref({});
    const cat = ref("全部");

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
      res.tags.forEach((tag) => {
        hottags.value.push(tag.name);
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
      categories,
      cat,
    };
  },
  methods: {
    updateOrder(order) {
      this.order = order;
    },
    updateCat(cat) {
      this.cat = cat;
    },
  },
};
</script>

<style lang="scss" scoped>
.playlist {
  .tag-nav {
    display: flex;
    align-items: center;
    margin: 10px 0;

    .title {
      margin-right: 20px;
    }

    .tags {
      display: flex;

      .tag {
        margin: 0 15px;
      }
    }
  }
  .playlist-wrapper {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 10px 20px;
  }
}

.loading {
  position: relative;
  bottom: var(--footer-height);
}

.drop-menu {
  display: flex;
  flex-direction: column;
  row-gap: 20px;

  .title {
    margin-bottom: 10px;
  }

  .sub {
    display: flex;
    flex-wrap: wrap;
    column-gap: 20px;
    row-gap: 10px;
  }
}
</style>
