<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'TheButton',
};
</script>

<style lang="scss">
.btn {
  @include flexVHCenter;
  padding: 8px;
  background: transparent;
  margin: 4px;
  border-radius: 3px;
  transition: 0.2s;
  user-select: none;
  cursor: pointer;
  border: none;

  &:active {
    transform: scale(0.92);
  }

  &:hover {
    background: rgba(209, 209, 214, 0.28);
  }
}
</style>
