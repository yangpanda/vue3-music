<template>
  <div class="search-bar flex-vertical-center">
    <svg-icon iconName="#icon-search" width="22px" height="22px" iconColor="#ffffff"/>
    <input class="search-text" type="text" placeholder="搜索">
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.search-bar {
  border-radius: 15px;
  overflow: hidden;
  padding: 0 10px;
  background-color: #e13e3e;
  align-items center

  .search-text {
    width: 150px;
    height: 30px;
    border: none;
    background-color: #e13e3e;
    color: #ffffff;
    padding-right 20px
    &::-webkit-input-placeholder {
        color #fff
        font-size 12px
    }

    &:focus {
      outline: none;
    }
  }
}
</style>