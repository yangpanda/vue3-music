<template>
  <the-scrollbar>
    <div :class="$style.tabNewsong">
      <n-tabs type="line">
        <n-tab-pane display-directive="show:lazy" name="oasis" tab="新歌速递">
          <top-song></top-song>
        </n-tab-pane>
        <n-tab-pane name="the beatles" tab="新碟上架">
          <top-album></top-album>
        </n-tab-pane>
      </n-tabs>
    </div>
  </the-scrollbar>
</template>

<script>
import { NTabs, NTabPane } from 'naive-ui';
import TopAlbum from './TopAlbum.vue';
import TopSong from './TopSong.vue';

export default {
  name: 'TabNewsong',
  components: {
    NTabs,
    NTabPane,
    TopAlbum,
    TopSong,
  },
};
</script>

<style module>
.tabNewsong {
  max-width: 1100px;
  margin: 0 auto;
  padding: 20px;
}
</style>
