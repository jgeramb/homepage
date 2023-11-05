<template>
  <dialog
    open
    class="fixed z-30 flex h-screen w-full flex-col items-center justify-center bg-primary-950 bg-opacity-80"
    @click.stop.prevent="$emit('close')"
  >
    <slot />
  </dialog>
</template>

<script setup>
defineEmits(["close"]);
</script>
