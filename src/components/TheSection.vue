<template>
  <section>
    <div :class="$style.header">
      <the-link :class="$style.title" :to="to">
        <div class="cursor-pointer">{{ title }}</div>
        <the-icon name="arrow-right" size="14" />
      </the-link>
      <slot name="nav"></slot>
    </div>
    <slot></slot>
    <div
      :class="[
        $style.content,
        cols == 2 ? $style.cols2 : '',
        cols == 3 ? $style.cols3 : '',
        cols == 4 ? $style.cols4 : '',
        cols == 5 ? $style.cols5 : '',
        cols == 6 ? $style.cols6 : '',
        cols == 7 ? $style.cols7 : '',
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
  composes: flexVCenter from '@/styles/mixin.css';
  justify-content: space-between;
  margin-bottom: 10px;
}
.title {
  composes: flexVCenter from '@/styles/mixin.css';
  color: #424242;
}
.title > :first-child {
  margin-right: 6px;
  font-size: 18px;
}
.content {
  display: grid;
  column-gap: 20px;
  row-gap: 20px;
}
.cols3 {
  grid-template-columns: repeat(3, 1fr);
}
.cols4 {
  grid-template-columns: repeat(4, 1fr);
}

.cols5 {
  grid-template-columns: repeat(5, 1fr);
}
.cols6 {
  grid-template-columns: repeat(6, 1fr);
}
.cols7 {
  grid-template-columns: repeat(7, 1fr);
}
</style>
