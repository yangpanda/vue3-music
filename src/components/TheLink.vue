<template>
  <a v-if="isExternalLink" v-bind="$attrs" :href="to" target="_blank">
    <slot />
  </a>
  <router-link v-else v-bind="$props" custom v-slot="{ isActive, href, navigate }">
    <a
      v-bind="$attrs"
      :href="href"
      @click="navigate"
      :class="[$style.link, isActive ? $style.activeClass : $style.inactiveClass]"
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

<style module>
.link {
  text-decoration: none;
}
.link:hover {
  color: #18a058 !important;
}
.activeClass {
  color: #18a058 !important;
}
.inactiveClass {
  color: rgba(0, 0, 0, 0.6);
}
</style>
