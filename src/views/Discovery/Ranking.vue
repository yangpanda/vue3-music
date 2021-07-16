<template>
  <div class="rank">
    <h1>官方榜</h1>
    <div class="official-wrapper">
      <div class="wrapper" v-for="(item, index) in officialList" :key="index">
        <card-playlist :playlist="item" style="width: 180px;"/>
        <ul>
          <li></li>
        </ul>
      </div>
    </div>
    <h2>全球榜</h2>
    <div class="list-wrapper">
      <card-playlist
        v-for="(item, index) in list"
        :key="index"
        :playlist="item"
      />
    </div>
  </div>
</template>

<script>
import CardPlaylist from "@/components/CardPlaylist.vue";
import { ref, onMounted } from "vue";
import Playlist from "@/model/Playlist.js";
import * as playlist from "@/api/service/playlist.js";

export default {
  name: "Ranking",
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
          if ("ToplistType" in item) {
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

<style lang="scss" scoped>
.rank {
  .official-wrapper {
    row-gap: 20px;

    .wrapper {
      display: flex;
      column-gap: 20px;
    }
  }
  .list-wrapper {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    column-gap: 20px;
  }
}
</style>
