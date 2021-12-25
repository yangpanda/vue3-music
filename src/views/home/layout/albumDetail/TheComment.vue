<template>
  <div :class="$style.comment">
    <section v-if="hotComments.length != 0">
      <h4>精彩评论</h4>
      <n-space vertical size="large">
        <comment-item v-for="comment in hotComments" :comment="comment" />
      </n-space>
    </section>
    <section v-if="comments.length != 0">
      <h4>最新评论</h4>
      <n-space vertical size="large">
        <comment-item v-for="comment in comments" :comment="comment" />
      </n-space>
      <n-pagination
        v-model:page="pageSize"
        :page-count="Math.ceil(total / pageSize)"
        @update-page="loadMore(page)"
      />
    </section>
  </div>
</template>

<script>
import api from '@/api/index.js';
import { onMounted, ref } from 'vue';
import CommentItem from '@/components/CommentItem.vue';
import { NPagination } from 'naive-ui';

export default {
  name: 'Comment',
  components: {
    CommentItem,
    NPagination,
  },
  props: {
    id: {
      type: [Number, String],
    },
  },
  setup(props) {
    const hotComments = ref([]);
    const comments = ref([]);
    const pageSize = ref(20);
    const total = ref(0);

    const getComment = (id) => {
      api.comment.ofAlbum(id).then((res) => {
        if (res.code === 200) {
          hotComments.value = res.hotComments;
          comments.value = res.comments;
          total.value = res.total;
        }
      });
    };

    const loadMore = (offset) => {
      api.comment.ofAlbum({ id: props.id, offset: offset }).then((res) => {});
    };

    onMounted(() => {
      getComment(props.id);
    });

    return {
      hotComments,
      comments,
      pageSize,
      total,
      loadMore,
    };
  },
};
</script>

<style module>
.comment {
  padding: 0 20px;
}
</style>
