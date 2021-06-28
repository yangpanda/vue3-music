<template>
  <div class="sub-menu">
    <div class="menu-item-content" @click="collapsed = !collapsed">
      <!-- <div v-if="iconName" class="menu-item-content-icon">
        <svg-icon :iconName="'#icon-' + iconName" size="24"></svg-icon>
      </div> -->
      <div class="menu-item-content-header">
        {{ label }}
      </div>
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
      color: #9ea4aa;
      grid-area: content;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
