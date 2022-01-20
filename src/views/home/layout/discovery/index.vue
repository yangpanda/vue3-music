<template>
  <div class="discovery">
    <div class="nav">
      <the-link :to="{ name: 'Personal' }">个性推荐</the-link>
      <the-link :to="{ name: 'Playlist' }">歌单</the-link>
      <the-link :to="{ name: 'Rank' }">排行榜</the-link>
      <the-link :to="{ name: 'Artist' }">歌手</the-link>
      <the-link :to="{ name: 'Newsong' }">最新音乐</the-link>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Discovery',
};
</script>

<style lang="scss" scoped>
.discovery {
  width: 100%;
  height: 100%;
  padding: 0 0 20px 0;
  & .nav {
    @include flexVHCenter;
    column-gap: 30px;
    height: 40px;
    font-size: 18px;
    font-weight: 600;
  }
  & .content {
    height: 100%;
    padding-bottom: 20px;
  }
}
</style>
