<template>
  <div :class="$style.container">
    <n-scrollbar>
      <n-menu
        :root-indent="15"
        :indent="0"
        :options="options"
        default-value="discovery"
        :default-expanded-keys="['subGroup', 'loveGroup']"
      />
    </n-scrollbar>
  </div>
</template>

<script>
import { NMenu, NScrollbar } from 'naive-ui';
import { RouterLink } from 'vue-router';
import { h, ref, computed } from 'vue';
import { useStore } from 'vuex';
import TheIcon from '@/components/TheIcon.vue';

function renderIcon(name) {
  return () =>
    h(
      TheIcon,
      {
        name,
        size: 20,
      },
      null,
    );
}

export default {
  name: 'TheSidebar',
  components: {
    NMenu,
    NScrollbar,
  },
  setup() {
    const store = useStore();
    const collectedPlaylists = computed(() => store.state.user.collectedPlaylists);
    const createdPlaylists = computed(() => store.state.user.createdPlaylists);

    function CreateMenuOption(playlist) {
      return {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                name: 'PlaylistDetail',
                params: {
                  id: playlist.id,
                },
              },
            },
            { default: () => playlist.name },
          ),
        key: playlist.id,
        icon: renderIcon('playList'),
      };
    }

    const options = ref([
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                name: 'Discovery',
              },
            },
            { default: () => '发现音乐' },
          ),
        key: 'discovery',
      },
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                name: 'MvRecommend',
              },
            },
            { default: () => 'MV' },
          ),
        key: 'mv',
      },
      {
        label: '我的音乐',
        type: 'group',
        key: 'mine',
        children: [
          {
            label: () =>
              h(
                RouterLink,
                {
                  to: {
                    name: 'History',
                  },
                },
                { default: () => '最近播放' },
              ),
            key: 'history',
            icon: renderIcon('history'),
          },
          {
            label: () =>
              h(
                RouterLink,
                {
                  to: {
                    name: 'Subscription',
                  },
                },
                { default: () => '我的收藏' },
              ),
            key: 'subscription',
            icon: renderIcon('collections'),
          },
        ],
      },
      {
        label: '创建的歌单',
        key: 'loveGroup',
        children: computed(() =>
          createdPlaylists.value.map((item) => ({
            ...CreateMenuOption(item),
            icon: renderIcon('love'),
          })),
        ),
      },
      {
        label: '收藏的歌单',
        key: 'subGroup',
        children: computed(() => collectedPlaylists.value.map((item) => CreateMenuOption(item))),
      },
    ]);

    return {
      options,
    };
  },
};
</script>

<style module>
.container {
  width: 260px;
  height: 100%;
  flex-shrink: 0;
  border-right: 1px solid rgba(0, 0, 0, 0.2);
}
</style>
