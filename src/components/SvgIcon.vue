<template>
  <i
    class="icon"
    :class="{ container: container }"
    :style="{ fontSize: size + 'px', color: iconColor }"
  >
    <svg>
      <use :xlink:href="iconName" />
    </svg>
  </i>
</template>

<script>
export default {
  name: "SvgIcon",
  props: {
    iconName: {
      type: String,
    },
    size: {
      type: [String, Number],
      default: 22,
    },
    iconColor: {
      type: String,
      default: "#2c2f32",
    },
    container: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.icon {
  display: inline-block;
  text-align: center;
  height: 1em;
  width: 1em;
  line-height: 1em;
  fill: currentColor
}

svg {
  width: 1em;
  height: 1em;
}

.container {
  background-color: #fff;
  padding: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
}
</style>