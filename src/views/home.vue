<template>
  <div class="home">
    <teleport to="#banner">
      <YBanner></YBanner>
    </teleport>
    <section>
      <div class="header">
        <div class="title">推荐歌单</div>
        <div class="all">查看全部</div>
      </div>
      <div class="playList">
        <div class="daily-recommend">
          <img
            class="img"
            src="https://p1.music.126.net/AhYP9TET8l-VSGOpWAKZXw==/109951165134386387.jpg?param=1024y1024"
          />
          <div class="title">每日推荐</div>
          <div class="play-icon-container">
            <svg-icon class="icon" name="play" color="#fff" size="36%" />
          </div>
        </div>
        <div v-for="item in state.playLists">
          <YCover :picUrl="item.picUrl"></YCover>
          <div class="name">{{ item.name }}</div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Home',
};
</script>

<script setup>
import http from '@/http';
import { onBeforeMount, reactive } from 'vue';
import YCover from '@/components/YCover.vue';
import YBanner from '@/components/YBanner.vue';
import SvgIcon from '@/components/SvgIcon.vue';

const state = reactive({
  playLists: [],
  focus: false,
});

onBeforeMount(async () => {
  state.playLists = await http.getPersonalizedPlayLists(8);
});
</script>

<style lang="scss" scoped>
@keyframes upDown {
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-25%);
  }

  100% {
    transform: translateY(0);
  }
}
.home {
  margin-top: 10px;

  .header {
    @include flexVHCenter;
    justify-content: space-between;
    margin-bottom: 10px;
    .title {
      font-size: 28px;
      font-weight: 600;
      cursor: default;
    }
    .all {
      font-weight: 16px;
      font-weight: 500;
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  .playList {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 20px;

    .daily-recommend {
      grid-column-start: 1;
      grid-column-end: 3;
      background-color: lightgray;
      border-radius: 8px;
      position: relative;
      z-index: 0;
      overflow: hidden;
      display: flex;
      justify-content: left;
      align-items: center;
      cursor: pointer;
      .title {
        color: white;
        font-weight: 600;
        font-size: 42px;
        writing-mode: vertical-rl;
        letter-spacing: 8px;
      }
      .img {
        @include absInset0;
        width: 100%;
        z-index: -1;
        animation: upDown 28s infinite;
      }
      .play-icon-container {
        position: absolute;
        right: 15px;
        bottom: 15px;
        transition: all 0.2s;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: hsla(0, 0%, 100%, 0.28);
        border: 1px solid hsla(0, 0%, 100%, 0.08);
        backdrop-filter: blur(8px);
        display: flex;
        align-items: center;
        justify-content: center;
        &:active {
          filter: brightness(0.8);
        }
        .icon {
          margin-left: 5px;
        }
      }
    }

    .name {
      font-size: 16px;
      font-weight: 600;
      margin-top: 8px;
      user-select: none;
      &:hover {
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }
}
</style>
