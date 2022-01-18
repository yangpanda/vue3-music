<template>
  <div :class="$style.card" @click="() => toArtistDetail(artist.id)">
    <the-image class="cursor-pointer" :src="artist.picUrl" round="normal"></the-image>
    <div :class="$style.title">
      <span class="cursor-pointer">{{ artist.name }}</span>
      <span></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardArtist',
};
</script>
<script setup>
import { useRouterMethods } from '../composables';
import Artist from '@/model/Artist';

const props = defineProps({
  artist: new Artist(),
});

const { toArtistDetail } = useRouterMethods();
</script>

<style module>
.card {
  display: flex;
  flex-direction: column;
  row-gap: var(--gap-sm);
}
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
