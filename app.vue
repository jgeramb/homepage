<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (import.meta.client) {
  gsap.registerPlugin(ScrollTrigger);
  useTransitionListener(() => setTimeout(() => ScrollTrigger.refresh(), 500));

  function updateDocumentHeight() {
    document.documentElement.style.setProperty("--vh", document.documentElement.clientHeight / 100 + "px");
  }

  useEventListener("resize", updateDocumentHeight, true);
  onMounted(() => {
    updateDocumentHeight();
    useClientTransitionState().setTransitionComplete(true);
  });
}
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
  @apply size-2;
}

::-webkit-scrollbar-track {
  @apply bg-primary-200;
}

::-webkit-scrollbar-thumb {
  @apply rounded-md bg-primary-400;
}
</style>
