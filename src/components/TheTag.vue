<template>
  <div :class="['the-tag-wrapper', { 'active': checked }]">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    checked: Boolean,
  },
}
</script>

<style lang="postcss">
.the-tag-wrapper {
  cursor: pointer;
  padding: 1px 8px;

  &.active {
    border: 1px solid lightgray;
    background-color: lightpink;
    border-radius: 9999rem;
  }
}
</style>