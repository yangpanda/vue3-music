<template>
  <div :class="$style.background">
    <the-icon :class="$style.btn" name="play-triangle" color="#ec4141" />
  </div>
</template>

<script>
export default {
  name: 'BgPlay',
};
</script>

<style module>
.background {
  position: relative;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 0 1px 2px rgba(0, 0, 0, 0.1);
}
.btn {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-45%, -50%);
}
</style>
