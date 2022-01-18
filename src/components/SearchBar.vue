<template>
  <div :class="$style.searchbar">
    <n-input :value="state.keyWords" type="text" placeholder="搜索" @focus="handleFocus">
      <template #suffix><the-icon name="search"></the-icon></template>
    </n-input>
    <div ref="dropDownDom" :class="$style.dropDown" v-if="state.showDropDown">
      <n-scrollbar>
        <div></div>
        <div :class="$style.hotSearch">
          <div
            :class="$style.hotSearchItem"
            v-for="(item, index) in state.hots"
            @click="() => hadnleToSearch(item.searchWord)"
          >
            <div :class="$style.index">{{ index + 1 }}</div>
            <div :class="$style.info">
              <div :class="$style.title">
                <span>{{ item.searchWord }}</span>
                <span>{{ item.score }}</span>
              </div>
              <div :class="$style.des">{{ item.content }}</div>
            </div>
          </div>
        </div>
      </n-scrollbar>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
};
</script>

<script setup>
import { NScrollbar, NInput } from 'naive-ui';
import { ref, reactive } from 'vue';
import api from '../api';
import useRouterMethods from '../composables/useRouterMethods';

const dropDownDom = ref(null);
const state = reactive({
  keyWords: '',
  hots: [],
  showDropDown: false,
});

const { toSearch } = useRouterMethods();
const handleFocus = () => {
  api.search.hotDetail().then((res) => {
    if (res.code === 200) {
      state.hots = res.data;
      state.showDropDown = true;
    }
  });
};
const handleBlur = () => {
  state.showDropDown = false;
};
const hadnleToSearch = (word) => {
  state.showDropDown = false;
  toSearch(word);
};
</script>

<style module>
.searchbar {
  composes: flexVCenter from '@/styles/mixin.css';
  width: 400px;
  position: relative;
}
.dropDown {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  width: 400px;
  height: 360px;
  border-radius: 6px;
  background-color: #fff;
  box-shadow: 0 1px 26px 6px rgba(0, 0, 0, 0.1);
}
.hotSearchItem {
  cursor: pointer;
  display: grid;
  grid-template-columns: 4em 1fr;
  align-items: center;
  padding: 10px 20px 10px 0;
  overflow: hidden;
}
.hotSearchItem:hover {
  background-color: rgba(0, 0, 0, 0.1);
}
.index {
  text-align: center;
  color: rgba(0, 0, 0, 0.5);
  font-size: 16px;
}
.hotSearchItem:nth-child(-n + 3) .index {
  color: #c93c3c;
}
.info {
  overflow: hidden;
}
.title {
  composes: ellipsis from '@/styles/mixin.css';
  font-weight: bold;
}
.title > :last-child {
  font-size: 12px;
  margin-left: 20px;
  color: rgba(0, 0, 0, 0.5);
}
.des {
  composes: ellipsis from '@/styles/mixin.css';
  color: rgba(0, 0, 0, 0.5);
  font-size: 12px;
}
</style>
