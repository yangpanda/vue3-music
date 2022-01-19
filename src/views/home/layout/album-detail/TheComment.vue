<template>
  <div :class="$style.comment" ref="commentDom">
    <section>
      <h3>最新评论</h3>
      <comment-item v-for="comment in state.comments" :comment="comment" />
    </section>
    <div :class="$style.wrap">
      <n-pagination
        v-model:page="state.offset"
        :page-count="Math.ceil(state.total / state.limit)"
        @update:page="
          () => {
            getComment();
            commentDom.scrollIntoView();
          }
        "
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'AlbumComment',
};
</script>

<script setup>
import { onBeforeMount, reactive, ref } from 'vue';
import CommentItem from '@/components/CommentItem.vue';
import { NPagination } from 'naive-ui';
import http from '@/api/http';

const props = defineProps({
  id: {
    type: [Number, String],
  },
});

const commentDom = ref(null);
const state = reactive({
  comments: [],
  total: 0,
  offset: 1,
  limit: 30,
});

const getComment = () => {
  http
    .getAlbumComments({
      id: props.id,
      offset: (state.offset - 1) * state.limit,
      limit: state.limit,
    })
    .then((res) => {
      state.total = res.total;
      state.comments = res.comments;
    });
};

onBeforeMount(() => {
  getComment(props.id);
});
</script>

<style module>
.comment {
  padding: 0 20px;
}
.wrap {
  display: flex;
  padding-top: 20px;
  justify-content: center;
}
</style>
