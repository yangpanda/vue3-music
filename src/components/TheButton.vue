<template>
  <span class="the-button">
    <slot></slot>
    <slot name="drop-menu" class="drop-menu"></slot>
  </span>
</template>

<script>
export default {
  name: "TheButton",
};
</script>

<style>
.the-button {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 5px;
  border: 1px solid lightgray;
  border-radius: 4px;
}

.drop-menu {
  position: absolute;
  top: calc(100% + 10px); 
  left: 0;
  z-index: var(--max-z-index);
  cursor: default;
  background-color: #fff;
  border-radius: 5px;
  padding: 20px;
  width: 800px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
</style>