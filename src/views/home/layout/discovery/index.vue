<template>
  <div :class="$style.discovery">
    <div :class="$style.nav">
      <n-menu default-value="personal" mode="horizontal" :options="menuOptions" />
    </div>
    <div :class="$style.content">
      <n-scrollbar ref="scrollbarRef">
        <div :class="$style.viewBox">
          <router-view></router-view>
        </div>
        <n-back-top v-if="scrollbarRef" :right="20" :bottom="100" :to="backtopRef"></n-back-top>
      </n-scrollbar>
    </div>
    <div :class="$style.backtopContainer" ref="backtopRef"></div>
  </div>
</template>

<script>
import { NScrollbar, NBackTop, NMenu } from 'naive-ui';
import { ref, provide, h } from 'vue';
import { useRouter } from 'vue-router';
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
    key: 'Rank',
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
    key: 'Artist',
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
    key: 'Newsong',
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
    const router = useRouter();
    const scrollbarRef = ref(null);
    const backtopRef = ref(null);

    provide('backToTop', (behavior = 'auto') =>
      scrollbarRef.value.scrollTo({
        top: 0,
        bahavior: `${behavior}`,
      }),
    );

    return {
      scrollbarRef,
      backtopRef,
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
