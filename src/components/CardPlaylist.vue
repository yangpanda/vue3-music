<template>
  <card-base :title="playList.name" @click="toPlaylistDetail(playList.id)">
    <div :class="$style.imageBox">
      <the-image :src="picSizeUrl(playList.imgUrl, 400)" round="large" />
      <div :class="$style.iconBox">
	<the-icon
	  :class="$style.playIcon"
	  name="play-triangle"
	  color="#ec4141" size="28"
	  @click.stop="playAll(playList.id)" />
      </div>
    </div>
  </card-base>
</template>

<script>
export default {
  name: 'CardPlaylist',
};
</script>

<script setup>
import CardBase from '@/components/CardBase.vue';
import useRouterMethods from '@/composables/useRouterMethods.js';
import { picSizeUrl } from '@/utils/picture.js';

const props = defineProps({
  playList: {}
})

const { toPlaylistDetail } = useRouterMethods();
</script>

<style module>
.imageBox {
  position: relative;
  cursor: pointer;
}
.iconBox {
  position: absolute;
  right: 1.2rem;
  bottom: 1.2rem;
  opacity: 0;
  transition-property: opacity;
  transition-duration: 500ms;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, .6);
  box-shadow: 0 2px 8px 0px rgba(0, 0, 0, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
}
.imageBox:hover .iconBox {
  opacity: 100;
}
.playIcon {
  margin-left: 2px;
}
</style>
