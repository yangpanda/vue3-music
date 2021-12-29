<template>
  <the-scrollbar>
    <div v-if="loginStatus">
      <div :class="$style.header">
        <h3>最近播放</h3>
        <n-button>播放全部</n-button>
      </div>
      <song-table-list :songs="history"></song-table-list>
    </div>
    <div v-else :class="$style.message">
      <n-result status="info" title="还没有登录哦" description="在这个年代，信息就是金钱，金钱就是信息。">
      </n-result>
    </div>
  </the-scrollbar>
</template>

<script>
import api from '@/api/index.js';
import { watchEffect, ref } from 'vue';
import { NButton, NResult } from 'naive-ui';
import Song from '@/model/Song.js';
import SongTableList from '@/components/SongTableList.vue';
import SongTableListItem from '@/components/SongTableListItem.vue';
import useLoginStatus from '@/composables/useLoginStatus.js';
import { mapState } from '@/lib/lib.js';

export default {
  name: 'PlayHistory',
  components: {
    NButton,
    NResult,
    SongTableList,
    SongTableListItem,
  },
  setup() {
    const history = ref([]);
    const { loginStatus } = useLoginStatus();
    const { userinfo } = mapState();

    const getPlayHistory = (id) => {
      api.user.getPlayHistory(id).then((res) => {
        if (res.code === 200) {
          history.value = res.weekData.map((item) => new Song(item.song));
        }
      });
    };

    watchEffect(() => {
      if (loginStatus.value) {
        const userId = userinfo.value.id;
        getPlayHistory(userId);
      }
    });

    return {
      history,
      loginStatus,
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
.message {
  padding-top: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
