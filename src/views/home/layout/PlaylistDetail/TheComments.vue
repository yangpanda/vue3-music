<template>
  <div :class="$style.container">
    <n-result
      v-if="isEmpty"
      status="info"
      title="貌似，啥也没有！"
      description="生活总归带点荒谬"
      size="huge"
    ></n-result>
    <div v-else>
      <div ref="commentPos" :class="$style.commentItemContainer">
        <comment-item v-for="item in comments" :key="item.commentId" :comment="item"></comment-item>
      </div>
      <div :class="$style.paginationContainer">
        <n-pagination
          v-model:page="page"
          :page-count="pageCount"
          :page-size="pageSize"
          @update-page="() => commentPos.scrollIntoView({ behavior: 'smooth' })"
        />
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api/index.js';
import CommentItem from '@/components/CommentItem.vue';
import { NPagination, NResult } from 'naive-ui';
import { ref, reactive, watch, onMounted, toRefs } from 'vue';

export default {
  name: 'TheComment',
  components: {
    CommentItem,
    NPagination,
    NResult,
  },
  props: {
    id: Number | String,
  },
  setup({ id }) {
    const commentPos = ref(null);
    const comments = ref([]);
    const isEmpty = ref(false);
    const state = reactive({
      total: 0,
      page: 1,
      pageSize: 30,
      pageCount: 0,
    });

    const getComment = async (offset = 0) => {
      const res = await api.comment.ofPlaylist({
        id,
        limit: state.pageSize,
        offset,
      });

      if (res.code == 200) {
        state.total = res.total;
        state.pageCount = Math.ceil(state.total / state.pageSize);

        comments.value = res.comments;
        if (comments.value.length === 0) {
          isEmpty.value = true;
        }
      }
    };

    watch(
      () => state.page,
      () => {
        getComment((state.page - 1) * state.pageSize);
      },
    );

    onMounted(() => {
      getComment();
    });

    return {
      commentPos,
      comments,
      isEmpty,
      ...toRefs(state),
    };
  },
};
</script>

<style module>
.container {
  padding: 20px 30px;
}
.commentItemContainer {
  display: flex;
  flex-direction: column;
  row-gap: 20px;
}
.paginationContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
</style>
