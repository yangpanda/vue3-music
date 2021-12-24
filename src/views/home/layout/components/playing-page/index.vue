<template>
  <the-scrollbar>
    <div :class="$style.container">
      <div :class="$style.top">
        <rotate-cd />
        <lyric />
      </div>
      <div :class="$style.commentContainer">
        <h3 ref="commentPos">听友评论</h3>
        <div :class="$style.commentItemContainer">
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
      <n-button
        style="font-size: 24px"
        circle
        size="large"
        :class="$style.down"
        @click="
          () => {
            setShowPlayingPage(false);
          }
        "
      >
        <n-icon>
          <icon-arrow-down></icon-arrow-down>
        </n-icon>
      </n-button>
    </div>
  </the-scrollbar>
</template>

<script>
import { mapState, mapMutations } from '@/lib/lib.js';
import { ref, watch, reactive, toRefs } from 'vue';
import api from '@/api/index.js';

import RotateCd from './RotateCd.vue';
import Lyric from './Lyric.vue';
import CommentItem from '@/components/CommentItem.vue';
import { NPagination, NIcon } from 'naive-ui';
import { IosArrowDown as IconArrowDown } from '@vicons/ionicons4';

export default {
  name: 'PlayingPage',
  components: {
    RotateCd,
    Lyric,
    CommentItem,
    NPagination,
    NIcon,
    IconArrowDown,
  },
  setup() {
    const commentPos = ref(null);
    const comments = ref([]);
    const { currentSong } = mapState();
    const { setShowPlayingPage } = mapMutations();

    const state = reactive({
      total: 0,
      page: 1,
      pageSize: 20,
      pageCount: 0,
    });

    const getComment = async (offset = 0) => {
      const res = await api.comment.ofSong({
        id: currentSong.value.id,
        limit: state.pageSize,
        offset,
      });

      if (res.code == 200) {
        state.total = res.total;
        state.pageCount = Math.ceil(state.total / state.pageSize);

        comments.value = res.comments;
      }
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

    return {
      commentPos,
      comments,
      ...toRefs(state),
      setShowPlayingPage,
    };
  },
};
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
