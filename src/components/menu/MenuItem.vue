<template>
  <div :class="$style.menuItem">
    <div :class="[$style.bg, 'rounded']"></div>
    <div :class="$style.content">
      <svg-icon :name="iconName" size="22" v-if="iconName" />
      <div class="ellipsis">{{ label }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    iconName: {
      type: [String, Boolean],
      default: false,
    },
    label: {
      type: String,
    },
  },
};
</script>

<style module>
.menuItem {
  position: relative;
  height: 4.2rem;
  cursor: pointer;
}
.bg {
  position: absolute;
  inset: 0.2rem 0.8rem;
  background-color: white;
  transition-property: all;
  transition-duration: 200ms;
}
.menuItem:hover .bg {
  background-color: rgba(220, 220, 220, 0.6);
}

.content {
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 1.4rem;
  column-gap: 0.8rem;
}
</style>
