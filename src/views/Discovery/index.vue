<template>
  <div class="discovery">
    <div class="nav">
      <div class="wrapper">
        <router-link class="personal-recommend router" to="/discovery/personal-recommend">个性推荐</router-link>
        <router-link class="playlist router" to="/discovery/playlist">歌单</router-link>
        <router-link class="ranking router" to="/discovery/ranking">排行榜</router-link>
        <router-link class="artist router" to="/discovery/artist">歌手</router-link>
        <router-link class="newest-music router" to="/discovery/new-song">最新音乐</router-link>
      </div>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "Discovery",
};

</script>

<style lang="scss" scoped>
.discovery {
  margin: 20px;

  .nav {
    font-size: 16px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
    margin-bottom: 20px;

    .wrapper {
      display: flex;
      justify-content: center;
    }

    .router {
      width: 70px;
      text-align: center;
      display: block;
      padding: 0 10px 10px 10px;
      text-decoration: none;
      color: #606266;

      &.router-link-exact-active {
        font-weight: bold;
        color: #303133;
        border-bottom: 2px solid #ec4141;
      }
    }
  }

  .content {
    min-width: 800px;
    max-width: 1000px;
    margin: 0 auto;
  }
}
</style>
