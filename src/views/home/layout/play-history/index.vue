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
import { ref, watchEffect, computed } from 'vue';
import { NButton, NResult } from 'naive-ui';
import Song from '@/model/Song.js';
import SongTableList from '@/components/SongTableList.vue';
import SongTableListItem from '@/components/SongTableListItem.vue';
import { useStore } from 'vuex';

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
    const store = useStore();
    const loginStatus = computed(() => store.state.user.loginStatus);
    const profile = computed(() => store.state.user.profile);

    const getPlayHistory = (id) => {
      api.user.getPlayHistory(id).then((res) => {
        if (res.code === 200) {
          history.value = res.weekData.map((item) => new Song(item.song));
        }
      });
    };

    watchEffect(() => {
      if (loginStatus.value) {
        getPlayHistory(profile.value.userId);
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
