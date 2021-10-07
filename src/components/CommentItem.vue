<template>
  <div :class="$style.commentItem">
    <the-image :src="comment.user.avatarUrl + '?param=50y50'" size="40" round="full" />
    <div :class="$style.info">
      <div>
        <span :class="$style.user">{{ comment.user.nickname }}：</span>
        <span>{{ comment.content }}</span>
      </div>
      <div>
        <div :class="$style.date">{{ new Date(comment.time).toLocaleString() }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    comment: Object,
  }
}
</script>

<style module>
.commentItem {
  display: flex;
  column-gap: var(--gap-sm);
}
.info {
  display: flex;
  flex-direction: column;
}
.user {
  cursor: pointer;
  color: #507daf;
}
.user:hover {
  color: #0b58b0;
}
.date {
  font-size: 12px;
  color: #9f9f9f;
}
</style>
