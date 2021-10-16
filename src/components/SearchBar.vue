<template>
  <div :class="$style.searchbar">
    <n-input class="searchbar" placeholder="搜索" @focus="handleFocus" @blur="handleBlur"></n-input>
    <div v-if="focused" :class="[$style.drop, 'shadow']">
      <n-scrollbar>
        <n-card title="热搜榜">
          <div v-for="item in hots">
            <h3>{{ item.searchWord }}</h3>
            <span>{{ item.score }}</span>
            <p>{{ item.content }}</p>
          </div>
        </n-card>
      </n-scrollbar>
    </div>
  </div>
</template>

<script>
import { NScrollbar, NPopover, NText, NInput, NCard } from "naive-ui";
import { ref } from 'vue'
import api from "../api";

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
    const focused = ref(false)
    const hots = ref([])

    const handleFocus = () => {
      api.search.hotDetail().then(res => {
        if (res.code === 200) {
          hots.value = res.data
          focused.value = true
        }
      })
    }

    const handleBlur = () => {
      focused.value = false
    }

    return {
      hots,
      focused,
      handleFocus,
      handleBlur
    }
  }
};
</script>

<style module>
.searchbar {
  display: flex;
  align-items: center;
  height: 100%;
  width: 26rem;
  position: relative;
}
.drop {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  min-width: 38rem;
  height: 50rem;
  border-radius: 6px;
  overflow: hidden;
}
</style>
