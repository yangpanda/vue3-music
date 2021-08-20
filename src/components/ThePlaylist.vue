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
import { useStore } from "vuex";
import { computed } from "vue";

export default {
  name: "ThePlaylist",
  components: {
    PlaylistItem,
  },
  setup() {
    const store = useStore();
    const playlist = computed(() => store.getters.getPlaylist);

    return {
      playlist,
    };
  },
};
</script>

<style lang="scss" scoped>
.container {
  background-color: #fff;
  width: 450px;
  box-shadow: -4px 0 6px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
</style>
