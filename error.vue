<template>
  <div class="grid min-h-dvh place-items-center">
    <div>
      <h1>{{ statusCode === 404 ? "Not Found" : "Unexpected Error" }}</h1>
      <p>{{ statusCode === 404 ? "This page does not exist." : "An unexpected error occurred." }}</p>
      <NuxtLink :to="useRequestHeader('Referrer') || '/'">Go back</NuxtLink>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({ error: Object });
const statusCode = computed(() => props.error.statusCode);

useHeadSEO(
  false,
  () => `${statusCode.value === 404 ? "Not Found" : "Unexpected Error"} • Justus Geramb`,
  () => (statusCode.value === 404 ? "Not Found" : "Unexpected Error"),
  () => (statusCode.value === 404 ? "This page does not exist." : "An unexpected error occurred."),
  () => useRoute().path
);
</script>
