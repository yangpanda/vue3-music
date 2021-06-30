<template>
  <card-base :title="mv.name">
    <template #image>
      <the-image
        :src="mv.picUrl + '?param=640y360'"
        ratio="16 / 9"
        radius="6px"
      />
    </template>
  </card-base>
</template>

<script>
import CardBase from "components/CardBase.vue";

export default {
  name: "CardMv",
  components: {
    CardBase,
  },
  props: {
    mv: {
      type: Object,
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
