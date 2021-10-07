<template>
  <div :class="$style.headerWrap">
    <div :class="$style.homeBtn" @click="toHome">
      <svg-icon name="logo" color="#ec4141" />
      <div>网易云音乐</div>
    </div>
    <search-bar />
    <login />
  </div>
</template>

<script>
import Login from "@/components/Login.vue";
import SearchBar from "@/components/SearchBar.vue";
import useRouterMethods from '@/composables/router-methods.js'

export default {
  name: 'AppHeader',
  components: {
    Login,
    SearchBar,
  },
  setup() {
    const {
      toHome
    } = useRouterMethods();

    return {
      toHome
    }
  }
}
</script>

<style module>
.headerWrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 0 2rem;
  background-color: #f5f5f5;
}

.homeBtn {
  display: flex;
  align-items: center;
  column-gap: 0.6rem;
  cursor: pointer;
  font-size: 1.8rem;
}
</style>