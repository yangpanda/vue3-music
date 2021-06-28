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
        <!-- <div class="buttons">
          <n-button-group size="small" style="margin-right: 10px">
            <n-button round color="#cc3232">
              <template #icon>
                <n-icon color="#fff"><play-icon /></n-icon>
              </template>
              播放全部
            </n-button>
            <n-button round color="#cc3232">
              <template #icon>
                <n-icon color="#fff"><add-icon /></n-icon>
              </template>
            </n-button>
          </n-button-group>
          <n-button round size="small">
            <template #icon>
              <n-icon>
                <collection-icon />
              </n-icon>
            </template>
            收藏
          </n-button>
        </div> -->
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
import SongTableList from "components/SongTableList.vue";
import TheImage from "components/TheImage.vue";

import { fetchPlaylistDetail, fetchSongsDetail } from "api/methods.js";
import { ref, watch } from "vue";

import Song from "model/Song.js";
import Playlist from "model/Playlist.js";

// import { Play as PlayIcon, AddSharp as AddIcon } from "@vicons/ionicons5";
// import { Collections20Regular as CollectionIcon } from "@vicons/fluent";

export default {
  name: "PlaylistDetail",
  props: {
    id: String,
  },
  components: {
    SongTableList,
    TheImage,
    // PlayIcon,
    // CollectionIcon,
    // AddIcon,
  },
  setup(props) {
    const playlistDetail = ref({});
    const songs = ref([]);

    const getPlaylistDetail = async () => {
      const res = await fetchPlaylistDetail(props.id);
      playlistDetail.value = new Playlist(res.playlist);
    };

    const getSongs = async () => {
      const songsId = [];
      playlistDetail.value.trackIds.forEach((item) => {
        songsId.push(item.id);
      });

      const res = await fetchSongsDetail(songsId);
      res.songs.forEach((item) => {
        songs.value.push(new Song(item));
      });
    };

    watch(playlistDetail, getSongs);

    return {
      playlistDetail,
      songs,
      getPlaylistDetail,
    };
  },
  mounted() {
    this.getPlaylistDetail();
  },
  activated() {
    this.getPlaylistDetail();
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
