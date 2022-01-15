<template>
  <div :class="$style.swiper">
    <div :class="$style.slideArea">
      <the-image
        v-for="(banner, index) in banners"
        :key="index"
        :src="banner.pic + '?param=540y208'"
        width="540px"
        height="208px"
        round="large"
        :class="[
          $style.slideItem,
          index === pre ? $style.pre : '',
          index === next ? $style.next : '',
          index === pointer ? $style.center : '',
        ]"
      />
      <div
        :class="[$style.btn, $style.btnPre]"
        @click="
          clearTimer();
          backward();
          setTimer();
        "
      >
        <the-icon name="arrow-left" color="#d8d8d8" :size="30" />
      </div>
      <div
        :class="[$style.btn, $style.btnNext]"
        @click="
          clearTimer();
          forward();
          setTimer();
        "
      >
        <the-icon name="arrow-right" color="#d8d8d8" :size="30" />
      </div>
    </div>
    <div :class="$style.pointerBox">
      <div
        v-for="index in banners.length"
        @click="changePointer(index - 1)"
        :class="[$style.pointer, pointer === index - 1 ? $style.active : '']"
      ></div>
    </div>
  </div>
</template>

<script>
import { computed, onBeforeUnmount, onMounted, toRefs, reactive } from 'vue';

export default {
  name: 'TheSwiper',
  props: {
    duration: {
      type: Number,
      default: 3000,
    },
    banners: {
      type: Array,
      default: [],
    },
  },
  setup(props) {
    const state = reactive({
      pointer: 0,
      timer: 0,
    });
    const { duration, banners } = toRefs(props);

    const forward = () => {
      if (state.pointer === banners.value.length - 1) {
        state.pointer = 0;
      } else {
        state.pointer++;
      }
    };

    const backward = () => {
      if (state.pointer === 0) {
        state.pointer = banners.value.length - 1;
      } else {
        state.pointer--;
      }
    };

    function clearTimer() {
      clearInterval(state.timer);
    }

    function setTimer() {
      state.timer = setInterval(forward, duration.value);
    }

    function changePointer(index) {
      clearTimer();
      state.pointer = index;
      setTimer();
    }

    const pre = computed(() => {
      if (state.pointer === 0) {
        return banners.value.length - 1;
      } else {
        return state.pointer - 1;
      }
    });

    const next = computed(() => {
      if (state.pointer === banners.value.length - 1) {
        return 0;
      } else {
        return state.pointer + 1;
      }
    });

    onBeforeUnmount(() => clearTimer());

    onMounted(() => {
      setTimer();
    });

    return {
      ...toRefs(state),
      pre,
      next,
      clearTimer,
      setTimer,
      changePointer,
      forward,
      backward,
    };
  },
};
</script>

<style module>
.slideArea {
  position: relative;
  z-index: 0;
  height: 208px;
  margin-bottom: 20px;
}

.slideItem {
  position: absolute;
  z-index: 10;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition-property: left, scale, visibility, transform;
  transition-duration: 800ms;
  visibility: hidden;
}
.pre {
  z-index: 9;
  left: 0;
  transform-origin: left;
  transform: translate(0, -50%) scale(0.85);
  visibility: visible;
}
.center {
  z-index: 11;
  visibility: visible;
}
.next {
  z-index: 9;
  left: 100%;
  transform-origin: right;
  transform: translate(-100%, -50%) scaleY(0.85);
  visibility: visible;
}
.btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 20;
}
.btnPre {
  left: 0;
}
.btnNext {
  right: 0;
}
.pointerBox {
  text-align: center;
}
.pointerBox > * {
  display: inline-block;
}
.pointerBox > :not(:first-child) {
  margin-left: 15px;
}
.pointer {
  cursor: pointer;
  width: 12px;
  height: 12px;
  background-color: lightgray;
  border-radius: 50%;
}
.active {
  background-color: red;
}
</style>
