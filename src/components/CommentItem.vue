<template>
  <div :class="$style.commentItem">
    <the-image :src="comment.user.avatarUrl" size="40" radius="full" />
    <div :class="$style.info">
      <div>
        <span :class="$style.user">{{ comment.user.nickname }}：</span>
        <span>{{ comment.content }}</span>
      </div>
      <div v-if="comment.beReplied.length">
        <div v-for="item in comment.beReplied" :key="item.beRepliedCommentId">
          <div :class="$style.beReplied">
            <span :class="$style.user">@{{ item.user.nickname }}：</span>
            <span>{{ item.content }}</span>
          </div>
        </div>
      </div>
      <div :class="$style.bottom">
        <div :class="$style.date">{{ new Date(comment.time).toLocaleString() }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    comment: Object,
  },
};
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
.beReplied {
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 10px;
  margin-top: 10px;
}
.bottom {
  margin-top: 10px;
}
</style>
