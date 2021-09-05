<template>
  <n-layout class="container" :native-scrollbar="false">
    <playlist-item
      class="item"
      v-for="(item, index) in playlist"
      :key="index"
      :song="item"
      :index="index"
    />
  </n-layout>
</template>

<script>
import PlaylistItem from "@/components/PlaylistItem.vue";
import { mapState } from "@/lib/lib.js";
import { computed } from "vue";

export default {
  name: "ThePlaylist",
  components: {
    PlaylistItem,
  },
  setup() {
    const { playlist } = mapState()

    return {
      playlist,
    };
  },
};
</script>

<style lang="scss" scoped>
.container {
  background-color: #fff;
  width: 100%;
  box-shadow: -4px 0 6px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
</style>
