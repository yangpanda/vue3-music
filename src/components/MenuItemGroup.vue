<template>
  <div class="menu-item-group">
    <div class="cursor-default h-12 leading-12 px-5 text-gray-400">
      {{ label }}
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "MenuItemGroup",
  props: {
    label: {
      type: String,
    },
  },
};
</script>

<style scoped>
</style>
