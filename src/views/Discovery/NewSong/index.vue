<template>
  <div class="new-song-container">
    <div class="new-song-nav">
      <router-link class="new-song-nav-link clear-a capsule-button" to="/discovery/new-song/top-song/">新歌速递</router-link>
      <router-link class="new-song-nav-link clear-a capsule-button" to="/discovery/new-song/top-album">新碟上架</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script setup>
</script>

<style scoped>
.new-song-nav {
  display: flex;
  justify-content: center;
}
.new-song-nav-link:hover {
  color: green;
}
.router-link-active {
  color: green;
}
</style>
