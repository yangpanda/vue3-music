<template>
  <div class="history-navigation">
      <svg-icon
        iconName="#icon-history-backward"
        width="18"
        height="18"
        fill="#f6cdcd"
      />
      <svg-icon
        iconName="#icon-history-forward"
        width="18"
        height="18"
        fill="#f6cdcd"
      />
  </div>
</template>

<script>
export default {
  
};
</script>

<style lang="scss" scoped>
.history-navigation {
  display: flex;

  .forward-container,
  .backward-container {
    width: 22px;
    height: 22px;
    background-color: #e63f3f;
  }

  .forward-container {
    margin-left: 10px;
  }
}
</style>