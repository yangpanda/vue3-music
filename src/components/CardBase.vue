<template>
  <div class="card-wrapper">
    <slot name="image"/>
    <span class="card-title">{{ title }}</span>
  </div>
</template>

<script>
export default {
  name: "CardBase",
  props: {
    title: {
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>
.card-wrapper {
  cursor: pointer;

  .card-title {
    display: inline-block;
    font-size: 16px;
    color: #606266;
    margin: 5px 0 10px 5px;
  }
}
</style>
