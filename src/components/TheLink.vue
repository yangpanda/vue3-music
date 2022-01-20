<template>
  <a v-if="isExternalLink" v-bind="$attrs" :href="to" target="_blank">
    <slot />
  </a>
  <router-link v-else v-bind="$props" custom v-slot="{ isActive, href, navigate }">
    <a
      v-bind="$attrs"
      :href="href"
      @click="navigate"
      class="link"
      :class="{active: isActive}"
    >
      <slot />
    </a>
  </router-link>
</template>

<script>
import { RouterLink } from 'vue-router';

export default {
  name: 'TheLink',

  props: {
    ...RouterLink.props,
    inactiveClass: String,
  },

  computed: {
    isExternalLink() {
      return typeof this.to === 'string' && this.to.startsWith('http');
    },
  },
};
</script>

<style lang="scss" scoped>
.link {
  text-decoration: none;
  color: #000;
  @include ellipsis;
}
.link:hover {
  color: #18a058 !important;
}
.active {
  color: #18a058 !important;
}
</style>
