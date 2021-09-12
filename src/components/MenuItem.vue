<template>
  <div class="relative h-12 group cursor-pointer">
    <div
      class="absolute top-0 bottom-0 left-2 right-2 rounded bg-white transition-all duration-200 group-hover:bg-gray-100">
    </div>
    <div class="relative flex items-center h-full px-5 gap-x-2">
      <svg-icon :name="iconName" size="22" class="" v-if="iconName" />
      <div class="overflow-ellipsis overflow-hidden whitespace-nowrap">
        {{ label }}
      </div>
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    iconName: {
      type: [String, Boolean],
      default: false
    },
    label: {
      type: String,
    },
  })
</script>

<style scoped>
</style>
