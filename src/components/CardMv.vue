<template>
  <div class="card-mv">
    <div class="wrapper">
      <the-image :src="mv.picUrl" ratio="958 / 539" />
    </div>
    <div class="title">{{ mv.name }}</div>
  </div>
</template>

<script>
export default {
  name: "CardMv",
  props: {
    mv: {
      type: Object,
    },
  },
};
</script>

<style lang="scss" scoped>
.card-mv {
  cursor: pointer;
  flex-basis: 32%;

  .wrapper {
    position: relative;
  }

  .title {
    margin: 5px 0 10px 5px;
    font-size: var(--font-size-16);
    color: #606266;
  }
}
</style>