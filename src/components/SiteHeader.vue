<template>
  <div class="site-header">
    <div class="container">
      <div class="title">音乐</div>
      <nav class="nav">
        <a class="link" v-for="(value, key) in navItems">{{ key }}</a>
      </nav>
      <img
        class="avatar"
        src="https://s4.music.126.net/style/web2/img/default/default_avatar.jpg?param=60y60"
      />
      <svg-icon class="github" name="github" size="30"></svg-icon>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SiteHeader',
};
</script>

<script setup>
import SvgIcon from '@/components/SvgIcon.vue';

const navItems = {
  歌单: 'PlayListPage',
  排行榜: 'RankPage',
  歌手: 'ArtistPage',
  最新音乐: 'NewMusicPage',
  我的: 'PersonalPage',
};
</script>

<style lang="scss" scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 10;
  height: $headerHeight;
  background: hsla(0, 0%, 100%, 0.86);
  backdrop-filter: saturate(180%) blur(20px);
  padding: 0 20px;
  .container {
    max-width: $siteMaxWidth;
    height: 100%;
    margin: 0 auto;
    display: grid;
    grid-template-columns: auto 1fr auto auto auto;
    align-items: center;
    column-gap: 20px;

    .title {
      cursor: pointer;
      font-size: 20px;
      font-weight: 600;
      margin-right: 40px;
    }

    .nav {
      font-size: 17px;
      font-weight: 600;
      display: flex;
      @include gap(15px);
      .link {
        cursor: pointer;
        &:hover {
          transition: all 0.2s;
          transform: translateY(-2px);
        }
      }
    }

    .avatar {
      width: 30px;
      border-radius: 50%;
      cursor: pointer;
      &:hover {
        filter: brightness(70%);
      }
    }

    .github {
      cursor: pointer;
      &:active {
        transition: all 0.2s;
        transform: scale(0.8);
      }
    }
  }
}
</style>
