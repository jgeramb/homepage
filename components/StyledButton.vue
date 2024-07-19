<template>
  <button
    class="shadow-xs flex items-center justify-center gap-2 rounded-md px-5 py-2.5 tracking-tight transition-[color,transform] duration-300 ease-in-out will-change-transform hover:scale-95 hover:text-opacity-85 md:px-4 md:py-2 md:text-sm"
    :class="{
      'bg-accent text-primary-50': primary,
      'bg-primary-200 text-primary-950': secondary,
      'bg-primary-950 text-primary-50': tertiary
    }"
  >
    <slot />
  </button>
</template>

<script setup>
defineProps({
  primary: Boolean,
  secondary: Boolean,
  tertiary: Boolean
});
</script>
