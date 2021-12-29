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
import { NMenu, NScrollbar, NIcon } from 'naive-ui';
import { RouterLink } from 'vue-router';
import { h, ref, computed, watchEffect } from 'vue';
import { mapState, mapMutations } from '@/lib/lib.js';
import api from '@/api/index.js';
import Playlist from '@/model/Playlist.js';

import { QueueMusicRound as IconMusicList, AccessTimeFilled as IconHistory } from '@vicons/material';
import { MdHeartEmpty as IconHeart } from '@vicons/ionicons4';
import { Collections24Regular as IconCollections } from '@vicons/fluent';

function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

export default {
  name: 'TheSidebar',
  components: {
    NMenu,
    NScrollbar,
  },
  setup() {
    const { userinfo, userPlaylists, logined } = mapState();
    const { setUserPlaylists } = mapMutations();

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
        icon: renderIcon(IconMusicList),
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
                name: 'Mv',
              },
            },
            { default: () => 'MV' },
          ),
        key: 'mv',
      },
      // {
      //   label: () =>
      //     h(
      //       RouterLink,
      //       {
      //         to: {
      //           name: 'Fm',
      //         },
      //       },
      //       { default: () => '私人FM' },
      //     ),
      //   key: 'fm',
      // },
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
            icon: renderIcon(IconHistory),
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
            icon: renderIcon(IconCollections),
          },
        ],
      },
      {
        label: '创建的歌单',
        key: 'loveGroup',
        children: computed(() => {
          if (userPlaylists.value) {
            const arr = userPlaylists.value.filter((item) => item.creator.userId == userinfo.value.id);
            return arr.map((item) => ({ ...CreateMenuOption(item), icon: renderIcon(IconHeart) }));
          } else {
            return [];
          }
        }),
      },
      {
        label: '收藏的歌单',
        key: 'subGroup',
        children: computed(() => {
          if (userPlaylists.value) {
            const arr = userPlaylists.value.filter((item) => item.creator.userId != userinfo.value.id);
            return arr.map((item) => CreateMenuOption(item));
          } else {
            return [];
          }
        }),
      },
    ]);

    const getUserPlaylists = async () => {
      const res = await api.playlist.getUserPlaylists(userinfo.value.id);
      if (res.code === 200) {
        setUserPlaylists(res.playlist.map((item) => new Playlist(item)));
      }
    };

    watchEffect(() => {
      if (logined.value) {
        getUserPlaylists();
      } else {
        setUserPlaylists(null);
      }
    });

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
