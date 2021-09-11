<template>
  <div class="scrollbar relative w-full h-full overflow-hidden" style="max-height: inherit;">
    <div class="content-container w-full h-full overflow-scroll">
      <div class="content">
        <slot></slot>
      </div>
    </div>
    <div class="track absolute top-0 right-0">
      <div class="thumb"></div>
    </div>
  </div>
</template>

<script>
</script>

<style scoped>
.content-container::-webkit-scrollbar,
.content-container::-webkit-scrollbar-thumb,
.content-container::-webkit-scrollbar-track-piece
{
  display: none;
  width: 0;
  height: 0;
}
</style>