<template>
  <div class="swiper">
    <div class="wrapper">
      <the-image
        class="image"
        v-for="(banner, index) in banners"
        :key="index"
        :src="banner.pic + '?param=540y200'"
        ratio="27 / 10"
        width="540px"
        height="200px"
        round="large"
        :class="{
          pre: index === pre,
          next: index === next,
          center: index === pointer,
        }"
      />
      <div class="button pre" @click="backward()">
        <svg-icon iconName="#icon-arrow-left" iconColor="#d8d8d8" size="30" />
      </div>
      <div class="button next" @click="forward()">
        <svg-icon iconName="#icon-arrow-right" iconColor="#d8d8d8" size="30" />
      </div>
    </div>
    <div class="navigation">
      <div
        class="navigator"
        v-for="(item, index) in banners.length"
        :key="index"
        @click="changePointer(index)"
        :class="{ active: pointer === index }"
      ></div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import TheImage from "@/components/TheImage.vue";

export default {
  name: "Swipper",
  components: {
    TheImage,
  },
  props: {
    banners: {
      type: Array
    }
  },
  data() {
    return {
      timer: 0,
    };
  },
  setup(props) {
    const banners = props.banners;

    const pointer = ref(1);
    const pre = computed(() => {
      if (pointer.value === 0) {
        return banners.length - 1;
      } else {
        return pointer.value - 1;
      }
    });
    const next = computed(() => {
      if (pointer.value === banners.length - 1) {
        return 0;
      } else {
        return pointer.value + 1;
      }
    });

    return {
      pointer,
      pre,
      next,
    };
  },
  beforeMount() {
    this.updateTimer();
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    updateTimer() {
      clearInterval(this.timer);
      this.timer = setInterval(this.forward, 4000);
    },
    changePointer(index) {
      clearInterval(this.timer);
      this.pointer = index;
      this.timer = setInterval(this.forward, 4000);
    },
    forward() {
      clearInterval(this.timer);
      if (this.pointer === this.banners.length - 1) {
        this.pointer = 0;
      } else {
        this.pointer++;
      }
      this.timer = setInterval(this.forward, 4000);
    },
    backward() {
      clearInterval(this.timer);
      if (this.pointer === 0) {
        this.pointer = this.banners.length - 1;
      } else {
        this.pointer--;
      }
      this.timer = setInterval(this.forward, 4000);
    },
  },
};
</script>

<style lang="scss" scoped>
.swiper {
  .wrapper {
    position: relative;
    height: 200px;
    overflow: hidden;

    .button {
      position: absolute;
      top: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      transform: translateY(-50%);
      padding: 10px;
      

      &.pre {
        left: 0;
      }
      &.next {
        right: 0;
      }
    }

    .image {
      visibility: hidden;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translateX(-50%) translateY(-50%);
      transition: all 0.4s ease-in-out;

      &.pre {
        visibility: initial;
        right: auto;
        left: 0;
        top: 50%;
        transform: translateY(-50%) scaleY(0.9);
      }

      &.next {
        visibility: initial;
        left: auto;
        right: 0;
        top: 50%;
        transform: translateY(-50%) scaleY(0.9);
      }

      &.center {
        visibility: initial;
        z-index: 1;
      }
    }
  }

  .navigation {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    column-gap: 10px;

    .navigator {
      cursor: pointer;
      border: 1px solid lightgray;
      width: 10px;
      height: 10px;
      border-radius: 50%;

      &.active {
      }
    }
  }
}
</style>
