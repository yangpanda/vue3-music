<template>
  <div :class="$style.card">
    <slot></slot>
    <div :class="$style.title">{{ title }}</div>
  </div>
</template>

<script>
export default {
  name: "CardBase",
  props: {
    title: {
      type: String,
    },
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
  cursor: pointer;
}
</style>