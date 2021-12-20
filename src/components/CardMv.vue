<template>
  <card-base class="cursor-pointer" :title="mv.name ?? mv.title" @click="toMvDetail(mv.id ?? mv.vid)">
    <the-image :src="picSrc() + '?param=640y360'" ratio="16 / 9" round="normal" />
  </card-base>
</template>

<script setup>
import CardBase from '@/components/CardBase.vue';
import useRouterMethods from '../composables/router-methods';

const props = defineProps({
  mv: Object,
});

const { toMvDetail } = useRouterMethods();

function picSrc() {
  return props.mv.picUrl ?? props.mv.cover ?? props.mv.imgurl ?? props.mv.coverUrl;
}
</script>
