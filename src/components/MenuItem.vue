<template>
  <div class="menu-item">
    <div class="menu-item-content">
      <div v-if="iconName" class="menu-item-content-icon">
        <svg-icon :iconName="'#icon-' + iconName" size="24"></svg-icon>
      </div>
      <div class="menu-item-content-header">
        {{ label }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MenuItem",
  props: {
    iconName: {
      type: [Boolean, String],
      default: false,
    },
    label: {
      type: [String],
    },
  },
};
</script>

<style lang="scss" scoped>
.menu-item {
  position: relative;
  margin-top: 6px;
  height: 42px;
  z-index: auto;

  &::before {
    content: "";
    position: absolute;
    z-index: auto;
    top: 0;
    bottom: 0;
    left: 8px;
    right: 8px;
    border-radius: 4px;
    background-color: #0000;
    transition: background-color 0.3s;
  }

  &:hover::before {
    background-color: rgba(0, 0, 0, 0.06);
  }

  .menu-item-content {
    height: 100%;
    padding: 0 20px;
    display: grid;
    grid-template-areas: "icon content arrow";
    grid-template-columns: auto 1fr auto;
    align-items: center;
    cursor: pointer;
    position: relative;
    z-index: auto;

    .menu-item-content-icon {
      grid-area: icon;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      margin-right: 5px;
    }

    .menu-item-content-header {
      grid-area: content;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
