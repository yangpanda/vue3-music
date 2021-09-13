<template>
  <div :class="classObject">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    isActive: Boolean,
    type: {
      type: String,
      default: 'default'
    },
    text: {
      type: Boolean,
      default: false,
    }
  },
  computed: {
    classObject() {
      return {
        'cursor-pointer': true,
        'bg-gray-100 px-2 py-px border rounded': this.type === 'default' && !this.text,
        'bg-red-100 text-red-500 px-2 border-red-200 rounded-full': this.type === 'capsule' || this.isActive,
      }
    }
  }
}
</script>