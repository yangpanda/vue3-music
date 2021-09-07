<template>
  <div class="space-y-3">
    <slot name="image"/>
    <div class="card-title">{{ title }}</div>
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

<style scoped>
</style>
