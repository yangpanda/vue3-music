<template>
  <div class="wrapper">
    <div class="content">
      <the-section label="最新MV" columns="4">
        <template #cards>
          <card-mv v-for="(item, index) in newMv" :key="index" :mv="item" />
        </template>
      </the-section>
      <!-- <the-section label="热播MV" columns="4">
      <template #cards>
        <card-mv
          v-for="(item, index) in topMv"
          :key="index"
          :mv="item"
        />
      </template>
    </the-section> -->
      <the-section label="网易出品" columns="4">
        <template #cards>
          <card-mv v-for="(item, index) in neteaseMv" :key="index" :mv="item" />
        </template>
      </the-section>
    </div>
  </div>
</template>

<script>
import TheSection from "@/components/TheSection.vue";
import CardMv from "@/components/CardMv.vue";
import { useMvGetNewMv, useMvGetNeteaseMv } from "@/composables/useMv.js";

export default {
  name: "Mv",
  components: {
    TheSection,
    CardMv,
  },
  setup() {
    const { newMv } = useMvGetNewMv();
    const { neteaseMv } = useMvGetNeteaseMv();

    return {
      newMv,
      neteaseMv,
    };
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  margin: 20px;

  .content {
    display: grid;
    row-gap: 20px;
    min-width: 800px;
    max-width: 1100px;
    margin: 0 auto;
  }
}
</style>
