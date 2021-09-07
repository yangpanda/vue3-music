<template>
  <card-base :title="content.name">
    <template #image>
        <the-image
          class="cursor-pointer"
          :src="content.sPicUrl"
          ratio="16 / 9"
          round="middle"
        />
    </template>
  </card-base>
</template>

<script setup>
import CardBase from "@/components/CardBase.vue";

const props = defineProps({
  content: Object
})
</script>
