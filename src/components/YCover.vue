<template>
  <div class="cover" @mouseover="focus = true" @mouseleave="focus = false">
    <YImage class="img" radius="6" lazy :src="picUrl" />
    <transition name="fade">
      <div v-if="focus" class="background" :style="{ backgroundImage: `url(${picUrl})` }"></div>
    </transition>
    <div class="shade">
      <div class="play-icon-container">
        <svg-icon class="icon" name="play" color="#fff" size="36%" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'YCover',
};
</script>

<script setup>
import { ref } from 'vue';
import SvgIcon from '@/components/SvgIcon.vue';
import YImage from './YImage.vue';

const props = defineProps({
  picUrl: { type: String, default: '' },
});

const focus = ref(false);
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.cover {
  position: relative;
  z-index: 0;
  &:hover {
    cursor: pointer;
  }

  .background {
    position: absolute;
    z-index: -1;
    top: 8px;
    width: 100%;
    height: 100%;
    transform-origin: center;
    filter: blur(16px) opacity(0.6);
    transform: scale(1.01, 1.02);
  }
  .shade {
    @include flexVHCenter;
    @include absInset0;
    background: transparent;
    .play-icon-container {
      opacity: 0;
      transition: all 0.2s;
      width: 32%;
      height: 32%;
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
        margin-left: 6px;
      }
    }
  }
  &:hover .play-icon-container {
    opacity: 100;
  }
}
</style>
