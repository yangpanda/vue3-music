<template>
  <div :class="$style.container">
    <card-mv v-for="item in mvs" :mv="item"></card-mv>
  </div>
</template>

<script>
export default {
  name: 'MvList',
};
</script>

<script setup>
import CardMv from '@/components/CardMv.vue';
import http from '@/api/http.js';
import { ref } from 'vue';

const props = defineProps({
  id: [String, Number],
});

const mvs = ref([]);

http.getArtistMvs(props.id).then((res) => {
  mvs.value = res;
});
</script>

<style module>
.container {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  row-gap: var(--gap-lg);
  column-gap: var(--gap-lg);
}
</style>
