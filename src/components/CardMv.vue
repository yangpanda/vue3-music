<template>
  <card-base class="cursor-pointer" :title="mv.name ?? mv.title" @click="toMvDetail(mv.id ?? mv.vid)">
    <the-image :src="mv.picUrl" ratio="16 / 9" radius="8" />
  </card-base>
</template>

<script setup>
import CardBase from '@/components/CardBase.vue';
import useRouterMethods from '../composables/useRouterMethods';

const props = defineProps({
  mv: Object,
});

const { toMvDetail } = useRouterMethods();
</script>
