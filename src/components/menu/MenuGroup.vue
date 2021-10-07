<template>
  <div>
    <div :class="$style.label">{{ label }}</div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "MenuGroup",
  props: {
    label: {
      type: String,
    },
  },
};
</script>

<style module>
.label {
  cursor: default;
  height: 4.2rem;
  line-height: 4.2rem;
  padding: 0 1.4rem;
  color: #505050;
}
</style>
