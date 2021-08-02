<template>
  <card-base class="card" :title="privateContent.name">
    <template #image>
      <div class="wrapper">
        <div class="icon-container round">
          <svg-icon
            class="icon-play"
            iconName="#icon-play-triangle"
            iconColor="#fff"
            size="18"
          />
        </div>
        <the-image
          class="pic"
          :src="privateContent.sPicUrl"
          ratio="16 / 9"
          radius="6px"
        />
      </div>
    </template>
  </card-base>
</template>

<script>
import CardBase from "@/components/CardBase.vue";

export default {
  name: "CardPrivateContent",
  components: {
    CardBase,
  },
  props: {
    privateContent: {
      type: Object,
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  .wrapper {
    position: relative;

    .icon-container {
      position: absolute;
      top: 8px;
      left: 8px;
      width: 24px;
      height: 24px;
      background-color: rgba(0, 0, 0, 0.3);
      border: 1px solid #c2c4cc;

      .icon-play {
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
