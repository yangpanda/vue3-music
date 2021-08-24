<template>
  <div class="artist-nav-container">
    <nav class="artist-nav language">
      <span class="artist-nav-title">语种：</span>
      <span
        class="artist-nav-item"
        :class="{ selected: area === item[0] }"
        v-for="(item, index) in languages.entries()"
        :key="index"
        @click="area = item[0]"
      >
        {{ item[1] }}
      </span>
    </nav>
    <nav class="artist-nav category">
      <span class="artist-nav-title">分类：</span>
      <span
        class="artist-nav-item"
        :class="{ selected: type === item[0] }"
        v-for="(item, index) in categories.entries()"
        :key="index"
        @click="type = item[0]"
      >
        {{ item[1] }}
      </span>
    </nav>
    <nav class="artist-nav alphabet">
      <span class="artist-nav-title">筛选：</span>
      <div class="artist-nav-item-container">
        <span
          class="artist-nav-item"
          @click="initial = -1"
          :class="{ selected: initial === -1 }"
          >热门</span
        >
        <span
          class="artist-nav-item"
          :class="{ selected: initial === item }"
          v-for="(item, index) in alphabet"
          :key="index"
          @click="initial = item"
        >
          {{ item }}
        </span>
        <span
          class="artist-nav-item"
          @click="initial = 0"
          :class="{ selected: initial === 0 }"
          >#</span
        >
      </div>
    </nav>
    <n-grid x-gap="20" y-gap="15" :cols="6">
      <n-grid-item v-for="(item, index) in artists" :key="index">
        <the-image :src="item.picUrl + '?param=300y300'"></the-image>
        <div class="footer">
          <span class="name">{{ item.name }}</span>
        </div>
      </n-grid-item>
    </n-grid>
  </div>
</template>

<script>
import * as artist from "@/api/service/artist.js";
import { shallowReactive, ref, watchEffect, toRefs } from "vue";
import { NGrid, NGridItem, NAvatar } from "naive-ui";

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
    NAvatar,
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

    const paramsReac = shallowReactive({
      initial: -1,
      area: -1,
      type: -1,
      limit: 30,
      offset: 0,
    });

    const artists = ref([]);

    const getArtist = async (param) => {
      const res = await artist.getArtist(param);
      if (res.code === 200) {
        artists.value = res.artists;
      }
    };

    watchEffect(() => {
      getArtist({
        initial: paramsReac.initial,
        area: paramsReac.area,
        type: paramsReac.type,
        limit: paramsReac.limit,
        offset: paramsReac.offset,
      });
    });

    return {
      languages,
      categories,
      alphabet,
      artists,
      ...toRefs(paramsReac),
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
.artist-nav-item-container {
  display: flex;
  column-gap: 10px;
  row-gap: 10px;
  flex-wrap: wrap;
}
.artist-nav-title {
  white-space: nowrap;
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
