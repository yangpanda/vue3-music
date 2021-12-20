<template>
  <div :class="$style.rank">
    <div :class="$style.section">
      <div class="text-lg">官方榜</div>
      <div :class="$style.content">
        <card-playlist v-for="(item, index) in officialList" :key="index" :playlist="item" />
      </div>
    </div>
    <div :class="$style.section">
      <div class="text-lg">全球榜</div>
      <div :class="$style.content">
        <card-playlist v-for="(item, index) in list" :key="index" :playlist="item" />
      </div>
    </div>
  </div>
</template>

<script>
import CardPlaylist from '@/components/CardPlaylist.vue';
import { ref, onMounted } from 'vue';
import Playlist from '@/model/Playlist.js';
import * as playlist from '@/api/service/playlist.js';

export default {
  name: 'Ranking',
  components: {
    CardPlaylist,
  },
  setup() {
    const list = ref([]);
    const officialList = ref([]);

    const getRankList = async () => {
      const res = await playlist.getRankList();

      if (res.code === 200) {
        res.list.map((item) => {
          if ('ToplistType' in item) {
            officialList.value.push(new Playlist(item));
          } else {
            list.value.push(new Playlist(item));
          }
        });
      }
    };

    onMounted(getRankList);

    return {
      list,
      officialList,
    };
  },
};
</script>

<style module>
.rank {
  display: flex;
  flex-direction: column;
  row-gap: var(--gap-lg);
}
.section {
  display: flex;
  flex-direction: column;
  row-gap: var(--gap-lg);
}
.content {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  row-gap: var(--gap-lg);
  column-gap: var(--gap-lg);
}
</style>
