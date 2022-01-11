<template>
  <div :class="$style.discovery">
    <div :class="$style.nav">
      <the-link :to="{ name: 'Personal' }">个性推荐</the-link>
      <the-link :to="{ name: 'Playlist' }">歌单</the-link>
      <the-link :to="{ name: 'Rank' }">排行榜</the-link>
      <the-link :to="{ name: 'Artist' }">歌手</the-link>
      <the-link :to="{ name: 'Newsong' }">最新音乐</the-link>
    </div>
    <div :class="$style.content">
      <the-scrollbar>
        <div :class="$style.viewBox">
          <router-view></router-view>
        </div>
      </the-scrollbar>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Discovery',
};
</script>

<style module>
.discovery {
  width: 100%;
  height: 100%;
  padding: 0 0 2rem 0;
}
.nav {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 5rem;
  font-size: 16px;
  color: black;
}
.nav > :not(:first-child) {
  margin-left: 30px;
}
.nav a {
  color: #18191c;
}
.content {
  height: calc(100% - 3rem);
}
.viewBox {
  max-width: 110rem;
  margin: 0 auto;
  padding: 0 2rem 2rem;
}
.backtopContainer {
  width: 0;
  height: 0;
}
</style>
