<template>
  <div :class="$style.discovery">
    <div :class="$style.nav">
      <n-menu default-value="personal" mode="horizontal" :options="menuOptions" />
    </div>
    <div :class="$style.content">
      <the-scrollbar>
        <div :class="$style.viewBox">
          <router-view></router-view>
        </div>
      </the-scrollbar>
    </div>
    <div :class="$style.backtopContainer" ref="backtopRef"></div>
  </div>
</template>

<script>
import { NScrollbar, NBackTop, NMenu } from 'naive-ui';
import { h } from 'vue';
import { RouterLink } from 'vue-router';

const menuOptions = [
  {
    key: 'personal',
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'Personal',
          },
        },
        { default: () => '个性推荐' },
      ),
  },
  {
    key: 'playlist',
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'Playlist',
          },
        },
        { default: () => '歌单' },
      ),
  },
  {
    key: 'rank',
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'Rank',
          },
        },
        { default: () => '排行榜' },
      ),
  },
  {
    key: 'artist',
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'Artist',
          },
        },
        { default: () => '歌手' },
      ),
  },
  {
    key: 'newsong',
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'Newsong',
          },
        },
        { default: () => '最新音乐' },
      ),
  },
];

export default {
  components: {
    NScrollbar,
    NBackTop,
    NMenu,
  },
  setup() {
    return {
      menuOptions,
    };
  },
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
