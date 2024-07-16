<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
if (import.meta.client) onMounted(() => useClientTransitionState().setTransitionComplete(true));
</script>

<style lang="scss">
/* Transitions */

.layout-enter-active,
.layout-leave-active,
.page-enter-active,
.page-leave-active {
  @apply transition-opacity duration-300 ease-in-out;
}

.layout-enter-from,
.layout-leave-to,
.page-enter-from,
.page-leave-to {
  @apply opacity-0;
}

/* Scrollbar */

::-webkit-scrollbar {
  @apply h-[7px] w-[7px];
}

::-webkit-scrollbar-track {
  @apply bg-primary-900;
}

::-webkit-scrollbar-thumb {
  @apply rounded-md bg-primary-600;
}

body {
  scrollbar-color: transparent transparent;
  scrollbar-width: thin;
}
</style>
