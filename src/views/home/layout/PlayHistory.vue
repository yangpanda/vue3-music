<template>
  <the-scrollbar>
    <div :class="$style.header">
      <h3>最近播放</h3>
      <n-button>播放全部</n-button>
    </div>
    <song-table-list :songs="history"></song-table-list>
  </the-scrollbar>
</template>

<script>
import api from '@/api/index.js';
import { mapState } from '@/lib/lib.js';
import { onMounted, ref } from 'vue';
import useRouterMethods from '@/composables/router-methods';
import { NButton } from 'naive-ui';
import Song from '@/model/Song.js';
import SongTableList from '@/components/SongTableList.vue';
import SongTableListItem from '@/components/SongTableListItem.vue';

export default {
  name: 'PlayHistory',
  components: {
    NButton,
    SongTableList,
    SongTableListItem,
  },
  setup() {
    const { logined, userinfo } = mapState();
    const { toLogin } = useRouterMethods();
    const history = ref([]);

    const getPlayHistory = (id) => {
      api.user.getPlayHistory(id).then((res) => {
        if (res.code === 200) {
          history.value = res.weekData.map((item) => new Song(item.song));
        }
      });
    };

    onMounted(() => {
      if (logined.value) {
        const userId = userinfo.value.id;
        getPlayHistory(userId);
      } else {
        toLogin();
      }
    });

    return {
      history,
    };
  },
};
</script>

<style module>
.header {
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
