<template>
  <input
    type="range"
    :min="min"
    :max="max"
    :step="step"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script>
export default {
  name: 'Slider',
  props: {
    min: { type: Number, default: 0, },
    max: { type: Number, default: 100, },
    modelValue: { type: Number },
    step: { type: Number, default: 1, }
  },
  emits: ['update:modelValue'],
}
</script>

<style scoped>
input[type="range"] {
  -webkit-appearance: none;
  width: 100%; /* Specific width is required for Firefox. */
  height: 100%;
  background: transparent; /* Otherwise white in Chrome */
}
input[type="range"]::-webkit-slider-thumb{
  -webkit-appearance: none;
  width: 15px;
  height: 15px;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05);
  cursor: pointer;
}

input[type=range]:focus {
  outline: none;
}

input[type=range]::-ms-track {
  width: 100%;
  height: 100%;
  cursor: pointer;

  /* Hides the slider so custom styles can be added */
  background: transparent; 
  border-color: transparent;
  color: transparent;
}

input[type=range]::-moz-range-thumb {
  width: 15px;
  height: 15px;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05);
  cursor: pointer;
}
</style>