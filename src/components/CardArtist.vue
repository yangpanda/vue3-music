<template>
  <div :class="$style.card" @click="router.push(`/artist-detail/${artist.id}`)">
    <the-image class="cursor-pointer" :src="artist.cover + '?param=300y300'" round="normal"></the-image>
    <div :class="$style.title">
      <span class="cursor-pointer">{{ artist.name }}</span>
      <span></span>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  name: 'CardArtist',
  props: {
    artist: Object,
  },
  setup() {
    const router = useRouter();
    return {
      router,
    };
  },
};
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
