<template>
  <div class="sidebar">
    <n-scrollbar>
      <menu-item to="Personal">发现音乐</menu-item>
      <menu-item to="MvRecommend">MV</menu-item>
      <menu-group title="我的音乐">
        <menu-item to="History" icon="history">最近播放</menu-item>
        <menu-item to="Subscription" icon="collections">我的收藏</menu-item>
      </menu-group>
      <menu-group title="创建的歌单">
        <menu-item
          v-for="item in createdPlaylists"
          :key="item.id"
          icon="playList"
          to="PlaylistDetail"
          :id="item.id"
          >{{ item.name }}</menu-item
        >
      </menu-group>
      <menu-group title="收藏的歌单">
        <menu-item
          v-for="item in collectedPlaylists"
          :key="item.id"
          icon="playList"
          to="PlaylistDetail"
          :id="item.id"
          >{{ item.name }}</menu-item
        >
      </menu-group>
    </n-scrollbar>
  </div>
</template>

<script>
export default {
  name: 'TheSidebar',
};
</script>

<script setup>
import MenuItem from './MenuItem.vue';
import MenuGroup from './MenuGroup.vue';
import { NScrollbar } from 'naive-ui';
import { useMapState } from '@/composables';

const { collectedPlaylists, createdPlaylists } = useMapState('user');
</script>

<style lang="scss" scoped>
.sidebar {
  flex-shrink: 0;
  width: 260px;
  height: 100%;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
}
</style>
