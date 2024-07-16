<template>
  <span ref="icon" class="material-symbols-rounded leading-none opacity-0">
    <slot />
  </span>
</template>

<script setup>
const icon = ref();

onMounted(() => (icon.value.style.opacity = 1));
</script>
