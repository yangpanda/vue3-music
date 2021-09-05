<template>
  <div
    class="
      flex
      items-center
      col-gap-10
      hover:bg-gray-100
      rounded
      cursor-default
    "
  >
    <div class="relative z-0">
      <div
        class="
          flex
          items-center
          justify-center
          absolute
          z-10
          top-1/2
          left-1/2
          transform
          -translate-x-1/2 -translate-y-1/2
          bg-white bg-opacity-80
          rounded-full
          w-7
          h-7
        "
      >
        <svg-icon
          iconName="#icon-play-triangle"
          iconColor="#ec4141"
          size="18"
          class="transform translate-x-0.5"
          @click="play(song)"
        />
      </div>
      <the-image
        class="pic"
        :src="song.image + '?param=50y50'"
        size="48"
        round="normal"
      />
    </div>
    <div class="w-0 flex flex-col flex-grow">
      <div class="overflow-ellipsis overflow-hidden whitespace-nowrap text-base">{{ song.name }}</div>
      <div class="overflow-hidden overflow-ellipsis whitespace-nowrap text-sm">{{ song.singer.join(" & ") }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardSong",
  props: {
    song: {
      type: Object,
    },
  },
  methods: {
    play(song) {
      this.$store.commit("setCurrentSong", song);
      this.$store.commit("insertSong", song);
    },
  },
};
</script>

<style scoped>

</style>
