<template>
  <div class="flex gap-x-4 py-5">
    <the-image
      :src="comment.user.avatarUrl + '?param=50y50'"
      size="40"
      class="flex-shrink-0"
      round="full"
    />
    <div class="flex-col">
      <div class="">
        <div
          class="inline mr-2 text-blue-500 hover:text-blue-800 cursor-pointer"
        >
          {{ comment.user.nickname }}:
        </div>
        <p class="inline">{{ comment.content }}</p>
      </div>
      <div class="">
        <div class="text-gray-400">
          {{ new Date(comment.time).toLocaleString() }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  comment: Object,
});
</script>

<style>
</style>
