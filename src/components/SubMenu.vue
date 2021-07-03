<template>
  <div class="sub-menu">
    <div class="menu-item-content" @click="collapsed = !collapsed">
      <div class="menu-item-content-header">
        {{ label }}
      </div>
      <svg-icon v-if="!collapsed" iconName="#icon-arrow-right" size="12" />
      <svg-icon v-if="collapsed" iconName="#icon-arrow-down" size="12" />
    </div>
    <div v-if="collapsed" class="sub-menu-children">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
    },
  },
  data() {
    return {
      collapsed: true,
    };
  },
};
</script>

<style lang="scss" scoped>
.sub-menu {
  position: relative;
  z-index: auto;

  .menu-item-content {
    margin-top: 6px;
    height: 36px;
    padding: 0 20px;
    display: grid;
    grid-template-areas: "content arrow";
    grid-template-columns: 1fr auto;
    align-items: center;
    cursor: pointer;
    position: relative;
    z-index: auto;

    .menu-item-content-header {
      color: #9ea4aa;
      grid-area: content;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
