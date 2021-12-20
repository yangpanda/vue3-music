<template>
  <div :class="$style.searchbar">
    <n-input class="searchbar" placeholder="搜索" @click.stop="setListener" @focus="handleFocus"></n-input>
    <div ref="drop" v-if="focused" :class="[$style.drop, 'shadow']">
      <n-scrollbar>
        <n-card title="热搜榜" size="small" content-style="padding: 0;">
          <div
            :class="$style.resultItem"
            v-for="(item, index) in hots"
            @click="
              toSearch(item.searchWord);
              focused = false;
            "
          >
            <div :class="$style.resultItemIndex">{{ index + 1 }}</div>
            <div :class="$style.resultItemRight">
              <div :class="$style.infoTitle">
                <n-text strong>{{ item.searchWord }}</n-text>
                <span class="text-sm">{{ item.score }}</span>
              </div>
              <div :class="['ellipsis']">{{ item.content }}</div>
            </div>
          </div>
        </n-card>
      </n-scrollbar>
    </div>
  </div>
</template>

<script>
import { NScrollbar, NPopover, NText, NInput, NCard } from 'naive-ui';
import { ref } from 'vue';
import api from '../api';
import useRouterMethods from '../composables/router-methods';

export default {
  name: 'SearchBar',
  components: {
    NScrollbar,
    NPopover,
    NText,
    NInput,
    NCard,
  },
  setup() {
    const focused = ref(false);
    const hots = ref([]);
    const drop = ref(null);
    const { toSearch } = useRouterMethods();

    const setListener = () => {
      document.addEventListener('click', (e) => {
        if (drop.value == e.target || drop.value.contains(e.target)) {
        } else {
          focused.value = false;
        }
      });
    };

    const handleFocus = () => {
      api.search.hotDetail().then((res) => {
        if (res.code === 200) {
          hots.value = res.data;
          focused.value = true;
        }
      });
    };

    const handleBlur = () => {
      if (document.activeElement != drop) {
        focused.value = false;
      }
    };

    return {
      hots,
      focused,
      drop,
      setListener,
      handleFocus,
      handleBlur,
      toSearch,
    };
  },
};
</script>

<style module>
.searchbar {
  display: flex;
  align-items: center;
  height: 100%;
  width: 40rem;
  position: relative;
}
.drop {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  width: 40rem;
  height: 36rem;
  border-radius: 6px;
  overflow: hidden;
}
.resultItem {
  display: flex;
  align-items: center;
  column-gap: var(--gap-md);
  padding: 4px 8px 4px 4px;
  cursor: pointer;
}
.resultItem:hover {
  background-color: rgba(110, 110, 110, 0.1);
}
.resultItemIndex {
  width: 2em;
  text-align: center;
}
.resultItemIndex:nth-child(-n + 3) {
  color: red;
}
.resultItemRight {
  display: flex;
  flex-direction: column;
  width: 0;
  flex-grow: 1;
  color: #919192;
}
.infoTitle {
  display: flex;
  align-items: center;
  column-gap: var(--gap-md);
}
</style>
