<template>
  <section class="section">
    <div class="section-header flex align-center space-between">
      <div class="section-header-left flex align-center">
        <span class="section-title">
          {{ title }}
        </span>
        <svg-icon iconName="#icon-arrow-right" size="14" iconColor="#303133" />
      </div>
      <slot name="nav"></slot>
    </div>
    <div class="cards-wrapper" :style="{ gridTemplateColumns: gridCols }">
      <slot name="cards"></slot>
    </div>
  </section>
</template>

<script setup>
import { ref, defineProps } from "vue";

const props = defineProps({
  title: String,
  cols: [Number, String],
});

const gridCols = ref(`repeat(${props.cols}, 1fr`);
</script>

<style lang="scss" scoped>
.section {
  display: flex;
  flex-direction: column;
  row-gap: 15px;
}
.section-title {
  font-size: 18px;
  color: #303133;
  font-weight: bold;
  margin-right: 8px;
  line-height: 1em;
}
.cards-wrapper {
  display: grid;
  gap: 10px 20px;
}
</style>
