<template>
  <div>
    <slot></slot>
    <div :class="$style.title">{{ title }}</div>
  </div>
</template>

<script>
export default {
  name: 'CardBase',
  props: {
    title: {
      type: String,
    },
  },
};
</script>

<style module>
.title {
  margin-top: 10px;
  cursor: pointer;
  font-size: 15px;
  font-weight: 600;
  color: #000;
}
</style>
