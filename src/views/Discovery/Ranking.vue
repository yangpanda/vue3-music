<template>
  <div class="space-y-5">
    <div class="space-y-4">
      <div class="text-lg font-bold">官方榜</div>
      <div class="grid grid-cols-5 gap-x-4 gap-y-4">
        <card-playlist
          v-for="(item, index) in officialList"
          :key="index"
          :playlist="item"
        />
      </div>
    </div>
    <div class="space-y-4">
      <div class="text-lg font-bold">全球榜</div>
      <div class="grid grid-cols-5 gap-x-4 gap-y-4">
        <card-playlist
          v-for="(item, index) in list"
          :key="index"
          :playlist="item"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CardPlaylist from "@/components/CardPlaylist.vue";
import { ref, onMounted } from "vue";
import Playlist from "@/model/Playlist.js";
import * as playlist from "@/api/service/playlist.js";
import { useLoadingBar } from 'naive-ui'

export default {
  name: "Ranking",
  components: {
    CardPlaylist,
  },
  setup() {
    const loading = ref(true)
    const loadingBar = useLoadingBar()
    const list = ref([]);
    const officialList = ref([]);

    const getRankList = async () => {
      loadingBar.start()
      const res = await playlist.getRankList();

      if (res.code === 200) {
        res.list.map((item) => {
          if ("ToplistType" in item) {
            officialList.value.push(new Playlist(item));
          } else {
            list.value.push(new Playlist(item));
          }
        });
        loadingBar.finish()
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

<style scoped>
</style>
