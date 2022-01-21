<template>
  <div class="banner">
    <div class="img-container">
      <div class="wrap">
        <YImage class="img" v-if="state.banners.length" :src="picUrl" ratio="18 / 7" />
        <button class="pre" @click="pre">
          <SvgIcon name="arrow-left" color="#fff" size="38"></SvgIcon>
        </button>
        <button class="next" @click="next">
          <SvgIcon name="arrow-right" color="#fff" size="38"></SvgIcon>
        </button>
        <div class="dot-container">
          <div
            class="dot"
            :class="{ active: i - 1 === state.count % state.banners.length }"
            v-for="i in state.banners.length"
            @click="setCount(i - 1)"
          ></div>
        </div>
      </div>
    </div>
    <div v-if="state.banners.length" class="background">
      <YImage class="img" :src="background" ratio="18 / 7" fixed></YImage>
    </div>
  </div>
</template>

<script>
export default {
  name: 'YBanner',
};
</script>

<script setup>
import http from '@/http';
import { computed, onBeforeMount, onBeforeUnmount, onMounted, reactive } from 'vue';
import SvgIcon from './SvgIcon.vue';
import YImage from './YImage.vue';

const state = reactive({
  banners: [],
  count: 0,
  timer: null,
  duration: 5000,
});

const picUrl = computed(() => {
  if (state.banners.length > 0) {
    return state.banners[state.count % state.banners.length].pic;
  } else {
    return '';
  }
});

const background = computed(() => {
  if (state.banners.length > 0) {
    return `${state.banners[state.count % state.banners.length].pic}?imageView&blur=40x20`;
  }
});

const setTimer = () => {
  state.timer = setInterval(() => {
    state.count++;
  }, state.duration);
};

const setCount = (i) => {
  clearInterval(state.timer);
  state.count = i;
  setTimer();
};

const next = () => {
  clearInterval(state.timer);
  state.count++;
  setTimer();
};

const pre = () => {
  clearInterval(state.timer);
  if (state.count === 0) {
    state.count = state.banners.length - 1;
  } else {
    state.count--;
  }
  setTimer();
};

onBeforeMount(async () => {
  state.banners = await http.getBanners(2);
});

onMounted(() => {
  setTimer();
});

onBeforeUnmount(() => {
  clearInterval(state.timer);
});
</script>

<style lang="scss" scoped>
.banner {
  position: relative;
  z-index: 0;
  .img-container {
    max-width: $siteMinWidth;
    margin: 0 auto;
    .wrap {
      position: relative;
      .img {
        box-shadow: 0 0 26px 8px rgba($color: #000000, $alpha: 0.2);
      }
      .pre {
        position: absolute;
        left: -60px;
        top: 50%;
        transform: translateY(-50%);
        &:active {
          transform: translateY(-50%) scale(0.92);
        }
      }
      .next {
        position: absolute;
        right: -60px;
        top: 50%;
        transform: translateY(-50%);
        &:active {
          transform: translateY(-50%) scale(0.92);
        }
      }
      .dot-container {
        @include flexVHCenter;
        @include gap(15px);
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 0;
        padding: 10px;

        .dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: hsla(0, 0%, 100%, 0.28);
          border: 1px solid hsla(0, 0%, 100%, 0.08);
          backdrop-filter: blur(8px);
          cursor: pointer;
          &.active {
            background: hsla(0, 100%, 50%, 0.8);
          }
        }
      }
    }
  }
  .background {
    position: absolute;
    z-index: -1;
    left: 0;
    right: 0;
    top: -$headerHeight;
    bottom: 0;
    overflow: hidden;
    .img {
      @include absInset0;
      filter: blur(50px) brightness(0.6);
    }
  }
}
</style>
