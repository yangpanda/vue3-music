<template>
  <li>
    <a
      :class="[
        'block text-gray-400 hover:text-black',
        {
          'bg-red-100 text-red-500 rounded-l-full rouded-r-full px-2': isActive,
        },
      ]"
    >
      <slot></slot>
    </a>
  </li>
</template>

<script>
export default {
    props: {
        isActive: Boolean
    }
}
</script>