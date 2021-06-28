<template>
  <section class="section">
    <div class="section-header">
      <span class="label">
        {{ label }}
      </span>
      <svg-icon iconName="#icon-arrow-right" size="14" iconColor="#303133" />
    </div>
    <div
      class="cards-wrapper"
      :style="{ gridTemplateColumns: gridTemplateColumns }"
    >
      <slot name="cards"></slot>
    </div>
  </section>
</template>

<script>
export default {
  name: "TheSection",
  props: {
    label: {
      type: String,
    },
    columns: {
      type: [Number, String],
    },
  },
  data() {
    return {
      gridTemplateColumns: `repeat(${this.columns}, 1fr)`,
    };
  },
};
</script>

<style lang="scss" scoped>
.section {
  .section-header {
    cursor: pointer;
    display: flex;
    align-items: center;
    width: fit-content;
    margin-bottom: 15px;

    .label {
      font-size: 18px;
      color: #303133;
      font-weight: bold;
      margin-right: 8px;
      line-height: 1em;
    }
  }

  .cards-wrapper {
    display: grid;
    gap: 10px 20px;
  }
}
</style>
