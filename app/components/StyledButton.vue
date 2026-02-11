<template>
  <button
    class="flex items-center justify-center gap-2 rounded-md px-5 py-2.5 tracking-tight shadow-xs transition-[color,scale] duration-300 ease-in-out hover:scale-95 active:scale-90 md:px-4 md:py-2 md:text-sm"
    :class="{
      'bg-accent text-primary-50': primary,
      'bg-primary-200 text-primary-950': secondary,
      'bg-primary-950 text-primary-50': tertiary
    }"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
defineProps<{ primary?: boolean; secondary?: boolean; tertiary?: boolean }>();
</script>
