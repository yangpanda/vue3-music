<template>
  <n-auto-complete class="searchbar" placeholder="搜索"></n-auto-complete>
</template>

<script>
import { NAutoComplete } from "naive-ui";

export default {
  name: 'SearchBar',
  components: {
    NAutoComplete,
  },
};
</script>

<style lang="postcss" scoped>
.searchbar {
  width: 260px;
}
</style>
