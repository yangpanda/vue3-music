<template>
  <the-scrollbar>
    <div :class="$style.container">
      <div :class="$style.top">
        <rotate-cd />
        <lyric />
      </div>
      <div :class="$style.commentContainer">
        <h3 ref="commentDom">听友评论</h3>
        <div :class="$style.commentItemContainer">
          <comment-item v-for="item in state.comments" :key="item.commentId" :comment="item"></comment-item>
        </div>
        <div :class="$style.paginationContainer">
          <n-pagination
            v-model:page="state.page"
            :page-count="state.pageCount"
            :page-size="state.pageSize"
            @update-page="() => commentDom.scrollIntoView({ behavior: 'smooth' })"
          />
        </div>
      </div>
      <n-button style="font-size: 24px" circle size="large" :class="$style.down" @click="togglePlayingPage">
        <the-icon name="arrow-down" size="20"></the-icon>
      </n-button>
    </div>
  </the-scrollbar>
</template>

<script>
export default {
  name: 'PlayingPage',
};
</script>

<script setup>
import { ref, watch, reactive } from 'vue';
import { useMapGetters, useMapMutations } from '@/composables';
import http from '@/api/http';
import RotateCd from './RotateCd.vue';
import Lyric from './Lyric.vue';
import { NPagination, NButton } from 'naive-ui';
import CommentItem from '@/components/CommentItem.vue';

const commentDom = ref(null);
const state = reactive({
  total: 0,
  page: 1,
  pageSize: 20,
  pageCount: 0,
  comments: [],
});

const { currentSong } = useMapGetters('player');
const { togglePlayingPage } = useMapMutations('player');

const getComment = (offset = 0) => {
  http
    .getSongComments({
      id: currentSong.value.id,
      limit: state.pageSize,
      offset,
    })
    .then((res) => {
      state.comments = res.comments;
      state.total = res.total;
      state.pageCount = Math.ceil(state.total / state.pageSize);
    });
};

watch(
  () => currentSong.value,
  () => {
    state.page = 1;
    getComment();
  },
);

watch(
  () => state.page,
  () => {
    getComment((state.page - 1) * state.pageSize);
  },
);
</script>

<style module>
.container {
  padding: 20px;
}
.down {
  position: fixed;
  right: 20px;
  top: 20px;
}
.top {
  max-width: 1000px;
  height: 500px;
  margin: 0 auto;
  margin-top: 20px;
  display: grid;
  grid-template-columns: 1fr 2fr;
  align-items: center;
  column-gap: 100px;
}
.commentContainer {
  max-width: 1000px;
  margin: 0 auto;
  margin-top: 30px;
}
.paginationContainer {
  margin: 0 auto;
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
.commentItemContainer {
  display: flex;
  flex-direction: column;
  row-gap: 20px;
}
</style>
