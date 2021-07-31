<template>
  <div class="wrapper">
    <router-link class="home-link" to="/">
      <svg-icon
        iconName="#icon-logo"
        iconColor="#ec4141"
        container
        style="margin-right: 5px"
      />
      <span class="title">网易云音乐</span>
    </router-link>
    <search-bar />
    <login />
  </div>
</template>

<script>
import Login from "@/components/Login.vue";
import SearchBar from "@/components/SearchBar.vue";

export default {
  components: {
    Login,
    SearchBar,
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  height: var(--header-height);
  padding: 0 20px;
  background-color: var(--red-color);
  display: flex;
  justify-content: space-between;
  align-items: center;

  .home-link {
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: 18px;
    color: #fff;
    text-decoration: none;

    .logo {
      margin-right: 5px;
    }
  }
}
</style>
