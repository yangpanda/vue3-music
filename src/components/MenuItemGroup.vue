<template>
  <div class="menu-item-group">
    <div class="menu-item-group-title">
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

<style lang="scss" scoped>
.menu-item-group {
  .menu-item-group-title {
    cursor: default;
    margin-top: 6px;
    height: 36px;
    line-height: 36px;
    color: #9ea4aa;
    padding: 0 20px;
  }
}
</style>