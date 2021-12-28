<template>
  <div :class="$style.layout">
    <!-- 中间 -->
    <div :class="$style.top">
      <the-sidebar></the-sidebar>
      <div :class="$style.content">
        <router-view :key="key"></router-view>
      </div>
      <div :class="[$style.playingPage, showPlayingPage ? $style.active : '']">
        <playing-page></playing-page>
      </div>
    </div>
    <!-- 底部播放器 -->
    <div :class="$style.player">
      <the-player />
    </div>
  </div>
</template>

<script>
import PlayingPage from './components/playing-page/index.vue';
import TheSidebar from './TheSidebar.vue';
import ThePlayer from './components/ThePlayer.vue';
import { mapState } from '@/lib/lib.js';

export default {
  components: {
    PlayingPage,
    TheSidebar,
    ThePlayer,
  },
  setup() {
    const { showPlayingPage } = mapState();

    return {
      showPlayingPage,
    };
  },
  computed: {
    key() {
      if (!(this.$route.path.indexOf('discovery') != -1)) {
        return this.$route.path;
      }
    },
  },
};
</script>

<style module>
.layout {
  position: relative;
  height: 100%;
  padding-top: 50px;
}
.top {
  position: relative;
  z-index: 0;
  display: flex;
  width: 100%;
  height: 100%;
  padding-bottom: 80px;
}
.content {
  flex-grow: 1;
  height: 100%;
}
.playingPage {
  position: absolute;
  left: 0;
  bottom: 80px;
  z-index: 10;
  background-color: white;
  width: 100%;
  height: 0;
  transition-property: all;
  transition-duration: 1000ms;
}
.active {
  height: calc(100% - 80px);
}

.player {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 80px;
  border-top: 1px solid lightgray;
}
</style>
