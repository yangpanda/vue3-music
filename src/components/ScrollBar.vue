<template>
  <div
    class="scrollbar relative w-full h-full overflow-hidden"
    @mouseover="showThumb = true"
    @mouseout="showThumb = false"
    style="max-height: inherit;"
  >
    <div ref="scrollArea" class="content-container w-full h-full overflow-scroll">
      <div ref="scrollContent" class="content">
        <slot></slot>
      </div>
    </div>
    <div ref="track" class="track absolute top-0.5 bottom-0.5 right-1 w-1">
      <div
        class="absolute thumb w-full h-7 rounded-lg transition-all duration-300"
        :class="[showThumb ? 'bg-gray-400' : 'bg-transparent']"
        :style="{height: thumbHeight + '%', top: thumbTop + 'px'}"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref, watch, nextTick } from "vue";

const showThumb = ref(false)

const scrollArea = ref(null)
const scrollContent = ref(null)
const track = ref(null)

const scrollTop = ref(0)
const thumbTop = ref(0)

const thumbHeight = ref(0)
const scrollHeight = ref(0)
const scrollAreaHeight = ref(0)

function handleScroll() {
  scrollTop.value = scrollArea.value.scrollTop
  thumbTop.value = scrollTop.value / scrollHeight.value * track.value.clientHeight
}

// watch(
//   () => scrollContent.value,
//   () => {
//     scrollContentHeight.value = scrollContent.value.offsetHeight
//     console.log(scrollContentHeight.value)
//   }
// )

onMounted(() => {
  nextTick(() => {
    scrollHeight.value = scrollArea.value.scrollHeight
    scrollAreaHeight.value = scrollArea.value.clientHeight
    thumbHeight.value = (scrollAreaHeight.value * 100) / scrollHeight.value
  })


  scrollArea.value.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  scrollArea.value.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.content-container::-webkit-scrollbar,
.content-container::-webkit-scrollbar-thumb,
.content-container::-webkit-scrollbar-track-piece {
  display: none;
  width: 0;
  height: 0;
}
.content-container {
  scrollbar-width: none;
}
</style>