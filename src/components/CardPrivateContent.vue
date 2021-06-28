<template>
  <div class="card-private-content">
    <div class="wrapper">
      <div class="play-button-container round light-shadow">
        <svg-icon iconName="#icon-play" iconColor="#fff" class="play" size="18" />
      </div>
      <the-image
        class="pic"
        :src="privateContent.sPicUrl"
        ratio="16 * 9"
      ></the-image>
    </div>
    <div class="title">{{ privateContent.name }}</div>
  </div>
</template>

<script>
export default {
  name: "CardPrivateContent",
  components: {},
  props: {
    privateContent: {
      type: Object,
    },
  },
};
</script>

<style lang="scss" scoped>
.card-private-content {
  position: relative;
  cursor: pointer;
  flex-basis: 32%;

  .wrapper {
    width: 100%;
    position: relative;

    .play-button-container {
      position: absolute;
      top: 10px;
      left: 10px;
      z-index: 1;
      width: 24px;
      height: 24px;
      background-color: rgba(0, 0, 0, 0.3);
      border: 1px solid #c2c4cc;

      .play {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translateX(-40%) translateY(-50%);
      }
    }
  }

  .title {
    margin: 5px;
    font-size: var(--font-size-16);
    color: #606266;
  }
}
</style>