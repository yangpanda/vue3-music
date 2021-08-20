<template>
  <div class="wrapper">
    <div class="info">
      <div class="cover">
        <the-image :src="playlistDetail.imgUrl" />
      </div>
      <div class="detail">
        <div class="title">
          <n-tag size="small" style="margin-right: 5px">歌单</n-tag>
          <h2 style="margin: 0">{{ playlistDetail.name }}</h2>
        </div>
        <div class="avatar">
          <n-avatar
            :src="playlistDetail.avatarUrl"
            circle
            :size="26"
            style="margin-right: 5px"
          />
          <span>{{ playlistDetail.creatorName }}</span>
        </div>
        <div class="tags">
          <span>标签： </span>
          <span>{{ playlistDetail.tags }}</span>
        </div>
        <div class="description">
          <span class="label">简介： </span>
          <span class="des ellipsis">{{ playlistDetail.description }}</span>
        </div>
      </div>
    </div>
    <song-table-list :songs="songs"></song-table-list>
  </div>
</template>

<script>
import SongTableList from "@/components/SongTableList.vue";
import TheImage from "@/components/TheImage.vue";

import { usePlaylistDetail } from '@/composables/usePlaylist.js'

export default {
  name: "PlaylistDetail",
  props: {
    id: String,
  },
  components: {
    SongTableList,
    TheImage,
  },
  setup(props) {
    const {
      playlistDetail,
      songs
    } = usePlaylistDetail(props.id)

    return {
      playlistDetail,
      songs,
    };
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  .info {
    display: flex;
    padding: 20px;
    height: 180px;

    .cover {
      flex: 0 0 180px;
    }

    .detail {
      margin-left: 15px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex-grow: 1;

      .title {
        display: flex;
        align-items: center;
      }

      .avatar {
        display: flex;
        align-items: center;
      }

      .description {
        display: flex;

        .label {
          flex-shrink: 0;
        }

        .des {
          flex: 1;
          width: 0;
        }
      }
    }
  }
}
</style>
