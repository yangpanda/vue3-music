<template>
  <div class="artist-nav-container">
    <nav class="artist-nav language">
      <span class="artist-nav-title">语种：</span>
      <span
        class="artist-nav-item"
        v-for="(item, index) in languages.values()"
        :key="index"
      >
        {{ item }}
      </span>
    </nav>
    <nav class="artist-nav category">
      <span class="artist-nav-title">分类：</span>
      <span
        class="artist-nav-item"
        v-for="(item, index) in categories.values()"
        :key="index"
      >
        {{ item }}
      </span>
    </nav>
    <nav class="artist-nav alphabet">
      <span class="artist-nav-title">筛选：</span>
      <span
        class="artist-nav-item"
        v-for="(item, index) in alphabet"
        :key="index"
      >
        {{ item }}
      </span>
    </nav>
    <n-grid x-gap="20" y-gap="15" :cols="6">
      <n-grid-item v-for="(item, index) in artists" :key="index">
        <the-image :src="item.picUrl + '?param=300y300'"></the-image>
      </n-grid-item>
    </n-grid>
  </div>
</template>

<script>
import * as artist from "@/api/service/artist.js";
import { ref, watchEffect } from "vue";
import {NGrid, NGridItem, NAvatar} from 'naive-ui'

function generateBigAlphabet() {
  var str = [];
  for (var i = 65; i < 91; i++) {
    str.push(String.fromCharCode(i));
  }
  return str;
}

export default {
  name: "Artist",
  components: {
    NGridItem,
    NGrid,
    NAvatar
  },
  setup() {
    const languages = new Map([
      [-1, "全部"],
      [7, "华语"],
      [96, "欧美"],
      [16, "韩国"],
      [0, "其他"],
    ]);

    const categories = new Map([
      [-1, "全部"],
      [1, "男歌手"],
      [2, "女歌手"],
      [3, "乐队"],
    ]);

    const alphabet = generateBigAlphabet();

    const reqParams = ref({
      initial: "-1",
      area: -1,
      type: -1,
      limit: 30,
      offset: 0,
    });

    const artists = ref([])

    const getArtist = async (param) => {
      const res = await artist.getArtist(param);
      if (res.code === 200) {
        artists.value = res.artists
      }
    };

    watchEffect(() => {
      getArtist(reqParams.value);
    });

    return {
      languages,
      categories,
      alphabet,
      artists
    };
  },
};
</script>

<style scoped>
.artist-nav-container {
  display: flex;
  flex-direction: column;
  row-gap: 10px;
}
.artist-nav {
  display: flex;
  column-gap: 10px;
}

.artist-nav-item {
  cursor: pointer;
  padding: 0 10px;
}
.artist-nav-item.selected {
  border: 1px solid lightcoral;
  background-color: rgb(224, 146, 146);
  border-radius: 999em;
}
</style>
