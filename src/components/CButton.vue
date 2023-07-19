<template>
  <button
    class="flex items-center justify-center gap-1 rounded-xl border-2 border-solid text-sm uppercase transition-all duration-500 hover:bg-opacity-0"
    :class="
      (small ? 'p-0.5' : 'px-3 py-0.5') +
      ' ' +
      (secondary
        ? 'border-primary-600 bg-primary-600 hover:border-primary-600'
        : 'border-transparent bg-accent hover:border-accent')
    "
    @click="$emit('button-click', $event)"
  >
    <slot />
  </button>
</template>
<script>
export default {
  props: {
    small: {
      type: Boolean,
      default: false
    },
    secondary: {
      type: Boolean,
      default: false
    }
  },
  emits: ['button-click']
};
</script>
