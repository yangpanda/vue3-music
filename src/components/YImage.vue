<template>
  <div class="yimage" :style="containerStyle">
    <div class="wrap" :style="wrapStyle">
      <img v-if="src" ref="imgDom" class="img" loaded="false" :style="imageStyle" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref, watch } from 'vue';

export default {
  name: 'YImage',
};
</script>

<script setup>
const props = defineProps({
  src: [String],
  radius: { type: [Number, String], default: 0 },
  lazy: { type: Boolean, default: false },
  ratio: { type: String, default: '1 / 1' },
  fixed: { type: Boolean, default: false },
});

const imgDom = ref(null);

const containerStyle = {
  borderRadius: `${props.radius}px`,
};

const wrapStyle = computed(() => {
  if (props.fixed) {
    return {
      paddingTop: 0,
      height: '100%',
    };
  } else {
    return { paddingTop: `calc(100% / (${props.ratio}))` };
  }
});

const imageStyle = computed(() => {
  if (props.fixed) {
    return { height: '100%' };
  } else {
    return {};
  }
});

onMounted(() => {
  if (props.lazy) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((item) => {
        if (item.intersectionRatio >= 0.25) {
          item.target.setAttribute('src', props.src);
          observer.disconnect();
          item.target.setAttribute('loaded', true);
        }
      });
    });
    observer.observe(imgDom.value);
  } else {
    imgDom.value.setAttribute('src', props.src);
    imgDom.value.setAttribute('loaded', true);
  }
});

watch(
  () => props.src,
  () => {
    imgDom.value.setAttribute('loaded', false);
    imgDom.value.setAttribute('src', props.src);
    imgDom.value.setAttribute('loaded', true);
  },
);
</script>

<style lang="scss" scoped>
.yimage {
  overflow: hidden;
  .wrap {
    position: relative;
    height: 0;
    background-color: rgba(0, 0, 0, 0.1);

    .img {
      @include absInset0;
      display: block;
      width: 100%;
      transition: opacity 0.5s;
      &[loaded='false'] {
        opacity: 0;
      }
      &[loaded='true'] {
        opacity: 1;
      }
    }
  }
}
</style>
