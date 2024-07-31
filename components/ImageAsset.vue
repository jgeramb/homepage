<template>
  <NuxtImg densities="x1 x2" format="webp" :loading="loading" />
</template>

<script setup>
defineProps({
  loading: {
    type: String,
    default: "lazy"
  }
});
</script>
