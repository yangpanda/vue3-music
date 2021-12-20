<template>
  <div :class="$style.layout">
    <!-- 中间 -->
    <div :class="$style.top">
      <div :class="$style.sidebar">
        <the-sidebar></the-sidebar>
      </div>
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
import TheSidebar from './components/TheSidebar.vue';
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
  position: absolute;
  z-index: 9;
  top: 5rem;
  bottom: 0;
  width: 100%;
}
.top {
  position: absolute;
  top: 0;
  bottom: 8rem;
  width: 100%;
  display: flex;
}
.sidebar {
  width: 20rem;
  height: 100%;
  border-right: 1px solid lightgray;
  flex-shrink: 0;
}
@media screen and (min-width: 1280px) {
  .sidebar {
    width: 26rem;
  }
}
@media screen and (min-width: 1536px) {
  .sidebar {
    width: 30rem;
  }
}

.content {
  flex-grow: 1;
  height: 100%;
}

.playingPage {
  position: absolute;
  left: 0;
  bottom: 0;
  background-color: white;
  width: 100%;
  height: 0;
  transition-property: all;
  transition-duration: 1000ms;
}
.active {
  /* width: 100%; */
  height: 100%;
}

.player {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 8rem;
  border-top: 1px solid lightgray;
}
</style>
