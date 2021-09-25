<template>
  <div ref="slider" class="slider">
    <div ref="track" class="track" :style="{ width: trackWidth + 'px' }">
      <div class="fill"></div>
    </div>
    <div
      ref="thumb"
      class="thumb"
      :style="{ left: thumbLeft + 'px' }"
      @mousedown="
        onMouseDown($event),
          $emit('chageCurrentTime', parseInt(newLeft / (342 / duration)))
      "
    ></div>
  </div>
</template>

<script>
export default {
  name: "TheSlider",
  props: {
    currentTime: 0,
    duration: 0,
  },
  data() {
    return {
      track: null,
      thumb: null,
      slider: null,
      shiftX: 0,
      newLeft: 0,
    };
  },
  mounted() {
    this.slider = this.$refs.slider;
    this.track = this.$refs.track;
    this.thumb = this.$refs.thumb;

    this.thumb.dragstart = function () {
      return false;
    };
  },
  computed: {
    trackWidth() {
      return this.currentTime * (342 / this.duration);
    },
    thumbLeft() {
      return this.currentTime * (342 / this.duration);
    },
  },
  methods: {
    onMouseDown(e) {
      e.preventDefault();

      this.shiftX = e.clientX - this.thumb.getBoundingClientRect().left;

      document.addEventListener("mousemove", this.onMouseMove);
      document.addEventListener("mouseup", this.onMouseUp);
    },
    onMouseMove(e) {
      this.newLeft =
        e.clientX - this.shiftX - this.slider.getBoundingClientRect().left;

      // console.log(this.newLeft);
      // the pointer is out of slider => lock the thumb within the bounaries
      if (this.newLeft < 0) {
        this.newLeft = 0;
      }
      let rightEdge = this.slider.offsetWidth - this.thumb.offsetWidth;
      if (this.newLeft > rightEdge) {
        this.newLeft = rightEdge;
      }

      this.thumb.style.left = this.newLeft + "px";
    },
    onMouseUp() {
      document.removeEventListener("mouseup", this.onMouseUp);
      document.removeEventListener("mousemove", this.onMouseMove);
    },
  },
};
</script>

<style lang="postcss" scoped>
.slider {
  position: relative;
  height: 4px;
  width: 360px;
  background-color: #e5e5e5;

  .track {
    height: 100%;
    width: 0;
    background-color: #ec4141;
    border-radius: 2px;
  }

  .thumb {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: #fff;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.3),
      inset 0 0 1px 0 rgba(0, 0, 0, 0.05);
    cursor: pointer;
  }
}
</style>
