<template>
  <section class="space-y-4">
    <div class="flex justify-between items-center">
      <div class="flex items-center gap-x-1.5">
        <div class="text-lg font-bold">
            {{ title }}
        </div>
        <svg-icon name="arrow-right" size="14" color="#303133" />
      </div>
      <slot name="nav"></slot>
    </div>
    <div class="grid gap-x-3 gap-y-3" :class="{
      'grid-cols-2': cols == 2,
      'grid-cols-3': cols == 3,
      'grid-cols-4': cols == 4,
      'grid-cols-5': cols == 5,
      'grid-cols-6': cols == 6,
      'grid-cols-7': cols == 7,
    }">
      <slot name="cards"></slot>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  title: String,
  cols: [Number, String],
});
</script>