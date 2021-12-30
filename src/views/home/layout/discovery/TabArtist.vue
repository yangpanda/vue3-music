<template>
  <div :class="$style.tabArtist">
    <div :class="$style.header">
      <nav :class="$style.nav">
        <span :class="$style.navTitle">语种：</span>
        <span
          v-for="(value, key) in areas"
          :class="[$style.navItem, area == key ? $style.selected : '']"
          @click="area = key"
          >{{ value }}</span
        >
      </nav>
      <nav :class="$style.nav">
        <span :class="$style.navTitle">分类：</span>
        <span
          :class="[$style.navItem, type == key ? $style.selected : '']"
          v-for="(value, key) in types"
          @click="type = key"
          >{{ value }}</span
        >
      </nav>
      <nav :class="$style.nav">
        <span :class="$style.navTitle">筛选：</span>
        <div :class="$style.navItemBox">
          <span :class="[$style.navItem, initial == -1 ? $style.selected : '']" @click="initial = -1"
            >热门</span
          >
          <span
            :class="[$style.navItem, initial === item ? $style.selected : '']"
            v-for="item in initials"
            :key="item"
            @click="initial = item"
            >{{ item }}</span
          >
          <span :class="[$style.navItem, initial == 0 ? $style.selected : '']" @click="initial = 0">#</span>
        </div>
      </nav>
    </div>
    <div v-infinite-scroll="loadMore" infinite-scroll-distance="10" :class="$style.content">
      <card-artist v-for="(item, index) in artists" :key="index" :artist="item" />
    </div>
    <div :class="$style.loadMore">
      <n-button v-if="hasMore" @click="loadMore">点击加载更多</n-button>
      <span v-else>没有更多了...</span>
    </div>
  </div>
</template>

<script>
import api from '@/api/index.js';
import { reactive, ref, toRefs, onMounted, watch } from 'vue';
import Artist from '@/model/Artist.js';
import CardArtist from '@/components/CardArtist.vue';
import { NPagination, NScrollbar, NButton } from 'naive-ui';

const types = {
  '-1': '全部',
  1: '男歌手',
  2: '女歌手',
  3: '乐队',
};

const areas = {
  '-1': '全部',
  7: '华语',
  96: '欧美',
  16: '韩国',
  0: '其他',
};

function generateBigAlphabet() {
  var arr = [];
  for (var i = 65; i < 91; i++) {
    arr.push(String.fromCharCode(i));
  }
  return arr;
}

const initials = generateBigAlphabet();

export default {
  name: 'TabArtist',
  components: {
    CardArtist,
    NPagination,
    NScrollbar,
    NButton,
  },
  setup() {
    const artists = ref([]);
    const hasMore = ref(true);
    const state = reactive({
      params: {
        initial: -1,
        area: -1,
        type: -1,
        limit: 96,
        offset: 0,
      },
    });

    const getArtist = async (params = state.params) => {
      const res = await api.artist.getArtist(params);
      if (res.code === 200) {
        hasMore.value = res.more;
        return new Promise((resolve) => resolve(res.artists.map((item) => new Artist(item))));
      }
    };

    watch(
      () => [state.params.area, state.params.type, state.params.initial],
      () => {
        getArtist().then((res) => {
          artists.value = res;
        });
      },
    );

    onMounted(() => {
      getArtist().then((res) => {
        artists.value = res;
      });
    });

    const loadMore = () => {
      getArtist().then((res) => {
        artists.value.push(...res);
      });
    };

    return {
      types,
      areas,
      initials,
      artists,
      loadMore,
      hasMore,
      ...toRefs(state.params),
    };
  },
};
</script>

<style module>
.tabArtist {
  display: flex;
  flex-direction: column;
  row-gap: var(--gap-lg);
}
.header {
  display: flex;
  flex-direction: column;
  row-gap: var(--gap-sm);
}
.nav {
  display: flex;
  column-gap: var(--gap-sm);
}
.navTitle {
  white-space: nowrap;
}
.navItem {
  cursor: pointer;
  width: 3em;
  text-align: center;
  padding: 0 10px;
}
.navItem:hover {
  color: #18a058;
}
.navItemBox {
  display: flex;
  flex-wrap: wrap;
  column-gap: var(--gap-sm);
  row-gap: var(--gap-sm);
}
.selected {
  color: #18a058;
}
.loadMore {
  display: flex;
  justify-content: center;
  padding: 10px;
}
.content {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  row-gap: var(--gap-lg);
  column-gap: var(--gap-lg);
}
</style>
