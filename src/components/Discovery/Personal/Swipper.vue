<template>
  <div class="swiper space-y-5">
    <div class="relative h-52 overflow-hidden z-0">
      <the-image
        class="
          absolute
          left-1/2
          top-1/2
          transform
          -translate-x-1/2 -translate-y-1/2
          invisible
          transition
          duration-500
          z-10
        "
        v-for="(banner, index) in banners"
        :key="index"
        :src="banner.pic + '?param=540y208'"
        width="540px"
        height="208px"
        round="large"
        :class="{
          pre: index === pre,
          next: index === next,
          center: index === pointer,
        }"
      />
      <div
        class="
          absolute
          left-0
          top-1/2
          transform
          -translate-y-1/2
          flex
          justify-center
          items-center
          px-3
          z-20
        "
        @click="backward()"
      >
        <svg-icon name="arrow-left" color="#d8d8d8" size="30" />
      </div>
      <div
        class="
          absolute
          right-0
          top-1/2
          transform
          -translate-y-1/2
          flex
          justify-center
          items-center
          px-3
          z-20
        "
        @click="forward()"
      >
        <svg-icon name="arrow-right" color="#d8d8d8" size="30" />
      </div>
    </div>
    <div class="flex justify-center col-gap-10">
      <div
        class="cursor-pointer h-3 w-3 bg-gray-200 rounded-full"
        v-for="(item, index) in banners.length"
        :key="index"
        @click="changePointer(index)"
        :class="{ 'bg-red-500': pointer === index }"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onBeforeMount, onBeforeUnmount } from "vue";

const props = defineProps({
  banners: Array,
});


const pointer = ref(0); // 游标
let timer = 0;

function updateTimer() {
  clearInterval(timer);
  timer = setInterval(forward, 4000);
}

function changePointer(index) {
  clearInterval(timer);
  pointer.value = index;
  timer = setInterval(forward, 4000);
}

function forward() {
  clearInterval(timer);
  if (pointer.value === props.banners.length - 1) {
    pointer.value = 0;
  } else {
    pointer.value++;
  }
  timer = setInterval(forward, 4000);
}

function backward() {
  clearInterval(timer);
  if (pointer.value === 0) {
    pointer.value = props.banners.length - 1;
  } else {
    pointer.value--;
  }
  timer = setInterval(forward, 4000);
}

const pre = computed(() => {
  if (pointer.value === 0) {
    return props.banners.length - 1;
  } else {
    return pointer.value - 1;
  }
});

const next = computed(() => {
  if (pointer.value === props.banners.length - 1) {
    return 0;
  } else {
    return pointer.value + 1;
  }
});

onBeforeMount(() => updateTimer());
onBeforeUnmount(() => clearInterval(timer));
</script>

<style lang="scss" scoped>
.pre {
  visibility: visible;
  right: auto;
  left: 0;
  top: 50%;
  transform: translateY(-50%) scaleY(0.9);
  z-index: 9;
}

.next {
  visibility: visible;
  left: auto;
  right: 0;
  top: 50%;
  transform: translateY(-50%) scaleY(0.9);
  z-index: 9;
}

.center {
  visibility: visible;
}

</style>
