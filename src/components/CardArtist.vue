<template>
  <div class="cursor-pointer space-y-3" @click="router.push(`/artist-detail/${artist.id}`)">
    <the-image :src="artist.cover + '?param=300y300'" round="full"></the-image>
    <div class="text-center">
      <span class="name">{{ artist.name }}</span>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  name: 'CardArtist',
  props: {
    artist: Object,
  },
  setup() {
    const router = useRouter()
    return {
      router
    }
  }
}
</script>