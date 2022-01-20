<template>
  <div class="menu-item" :class="{ active: isActive }" @click="activeRoute">
    <div class="bg"></div>
    <div class="content">
      <the-icon v-if="icon" :name="icon" size="18"></the-icon>
      <span class="label">
        <slot></slot>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MenuItem',
};
</script>

<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const props = defineProps({
  to: '',
  id: [String, Number],
  icon: [String],
});

const route = useRoute();
const isActive = computed(() => {
  if (props.id) {
    return route.name === props.to && route.params.id == props.id;
  } else {
    return route.name === props.to;
  }
});

const router = useRouter();
const activeRoute = () => {
  router.push({
    name: props.to,
    params: {
      id: props.id,
    },
  });
};
</script>

<style lang="scss" scoped>
.menu-item {
  position: relative;
  z-index: 0;
  cursor: pointer;
  height: 46px;
  line-height: 46px;
  width: 100%;
  font-size: 16px;
  & .bg {
    position: absolute;
    inset: 2px 8px;
    transition: all 0.3s;
    border-radius: 4px;
  }
  &:hover .bg {
    background-color: rgba(0, 0, 0, 0.1);
  }
  &.active {
    font-weight: 600;
    font-size: 18px;
    & .bg {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
  & .content {
    @include flexVCenter;
    overflow: hidden;
    position: relative;
    z-index: 10;
    column-gap: 8px;
    height: 100%;
    padding: 0 14px;

    & .label {
      @include ellipsis;
    }
  }
}
</style>
