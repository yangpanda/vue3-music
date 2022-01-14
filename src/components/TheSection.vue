<template>
  <section>
    <div :class="$style.header">
      <the-link :class="$style.titleBox" :to="to">
        <div class="text-lg cursor-pointer" :class="$style.title">{{ title }}</div>
        <the-icon name="arrow-right" size="14" />
      </the-link>
      <slot name="nav"></slot>
    </div>
    <slot></slot>
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
const props = defineProps({
  title: String,
  cols: [Number, String],
  to: {
    type: [Object, String],
    default: {},
  },
});
</script>

<style module>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.titleBox {
  display: flex;
  align-items: center;
  color: #424242;
}
.titleBox > :first-child {
  margin-right: 6px;
}
.content {
  display: grid;
  column-gap: var(--gap-md);
  row-gap: var(--gap-md);
}
</style>
