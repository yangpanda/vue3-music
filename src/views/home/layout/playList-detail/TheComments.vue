<template>
  <div :class="$style.container" ref="commentDom">
    <n-result
      v-if="state.comments.length === 0"
      status="info"
      title="貌似，啥也没有！"
      description="生活总归带点荒谬"
      size="huge"
    ></n-result>
    <div v-else>
      <div :class="$style.commentItemContainer">
        <comment-item v-for="item in state.comments" :key="item.commentId" :comment="item"></comment-item>
      </div>
      <div :class="$style.paginationContainer">
        <n-pagination
          v-model:page="state.offset"
          :page-count="Math.ceil(state.total / state.limit)"
          :page-size="state.limit"
          @update-page="
            () => {
              getComment();
              commentDom.scrollIntoView({ behavior: 'smooth' });
            }
          "
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheComment',
};
</script>

<script setup>
import http from '@/api/http.js';
import CommentItem from '@/components/CommentItem.vue';
import { NPagination, NResult } from 'naive-ui';
import { ref, reactive, onMounted, toRefs } from 'vue';

const props = defineProps({
  id: [Number, String],
});

const commentDom = ref(null);
const state = reactive({
  total: 0,
  offset: 1,
  limit: 20,
  comments: [],
});

const getComment = () => {
  http
    .getPlayListComments({
      id: props.id,
      offset: (state.offset - 1) * state.limit,
      limit: state.limit,
    })
    .then((res) => {
      state.total = res.total;
      state.comments = res.comments;
    });
};

onMounted(() => {
  getComment();
});
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
