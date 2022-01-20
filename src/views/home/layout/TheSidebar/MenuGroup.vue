<template>
  <div class="title">{{ title }}</div>
  <slot></slot>
</template>

<script>
export default {
  name: 'MenuGroup',
  props: {
    title: {
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  cursor: default;
  font-size: 15px;
  height: 46px;
  line-height: 46px;
  padding: 0 14px;
  color: #505050;
}
</style>
