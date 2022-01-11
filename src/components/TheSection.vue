<template>
  <section :class="$style.section">
    <div :class="$style.header">
      <div :class="$style.titleBox" @click="toPage">
        <div class="text-lg cursor-pointer" :class="$style.title">{{ title }}</div>
        <the-icon name="arrow-right" size="14" />
      </div>
      <slot name="nav"></slot>
    </div>
    <div
      :class="[
        $style.content,
        {
          'grid-cols-2': cols == 2,
          'grid-cols-3': cols == 3,
          'grid-cols-4': cols == 4,
          'grid-cols-5': cols == 5,
          'grid-cols-6': cols == 6,
          'grid-cols-7': cols == 7,
        },
      ]"
    >
      <slot name="cards"></slot>
    </div>
  </section>
</template>

<script>
export default {
  name: 'TheSection',
};
</script>

<script setup>
import { useRouter } from 'vue-router';

const props = defineProps({
  title: String,
  cols: [Number, String],
  page: {},
});

const router = useRouter();

const toPage = () => {
  router.push(props.page);
};
</script>

<style module>
.section {
  display: flex;
  flex-direction: column;
  row-gap: var(--gap-lg);
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.titleBox {
  display: flex;
  align-items: center;
  column-gap: var(--gap-sm);
}
.content {
  display: grid;
  column-gap: var(--gap-md);
  row-gap: var(--gap-md);
}
</style>
