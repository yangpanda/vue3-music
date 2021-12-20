<template>
  <div class="divide-y divide-gray-200">
    <h4>精彩评论</h4>
    <comment-item v-for="(comment, index) in comments" :key="index" :comment="comment" />
  </div>
</template>

<script setup>
import CommentItem from '@/components/CommentItem.vue';

const props = defineProps({
  comments: Array,
});
</script>

<style scoped></style>
