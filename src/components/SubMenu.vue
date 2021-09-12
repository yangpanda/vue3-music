<template>
  <div>
    <div class="flex justify-between items-center h-12 px-5">
      <div class="flex gap-x-1 items-center cursor-pointer" @click="collapsed = !collapsed">
        <div class="text-gray-400  hover:text-black">
          {{ label }}
        </div>
        <svg-icon v-if="!collapsed" name="arrow-right" size="10" />
        <svg-icon v-if="collapsed" name="arrow-down" size="10" />
      </div>
    </div>
    <div v-if="collapsed">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
    },
  },
  data() {
    return {
      collapsed: true,
    };
  },
};
</script>
