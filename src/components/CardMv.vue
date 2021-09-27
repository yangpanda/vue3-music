<template>
  <card-base class="cursor-pointer" :title="mv.name" @click="$router.push(`/mv-detail/${mv.id}`)">
    <the-image
      :src="picSrc() + '?param=640y360'"
      ratio="16 / 9"
      round="normal"
    />
  </card-base>
</template>

<script setup>
import CardBase from "@/components/CardBase.vue";

const props = defineProps({
  mv: Object,
});

function picSrc() {
  return props.mv.picUrl ?? props.mv.cover ?? props.mv.imgurl;
}
</script>
