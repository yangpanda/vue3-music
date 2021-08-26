<template>
	<div class="rank">
		<h1>官方榜</h1>
		<n-grid :x-gap="20" :y-gap="15" :cols="5">
			<n-grid-item v-for="(item, index) in officialList" :key="index">
				<card-playlist :playlist="item" />
			</n-grid-item>
		</n-grid>
		<h2>全球榜</h2>
		<n-grid :x-gap="20" :y-gap="15" :cols="5">
			<n-grid-item v-for="(item, index) in list" :key="index">
				<card-playlist :playlist="item" />
			</n-grid-item>
		</n-grid>
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

<style lang="scss" scoped>
</style>
