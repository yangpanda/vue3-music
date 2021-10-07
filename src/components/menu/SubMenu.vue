<template>
  <div>
    <div :class="$style.labelBox">
      <div :class="$style.label" @click="collapsed = !collapsed">
        <div>{{ label }}</div>
        <svg-icon v-if="!collapsed" name="arrow-right" size="10" />
        <svg-icon v-if="collapsed" name="arrow-down" size="10" />
      </div>
    </div>
    <div v-if="collapsed">
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

<style module>
.labelBox {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4.2rem;
  padding: 0 1.4rem;
}
.label {
  display: flex;
  align-items: center;
  column-gap: 0.4rem;
  cursor: pointer;
  color: #505050;
}
</style>