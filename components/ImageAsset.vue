<template>
  <NuxtImg densities="x1 x2 x3" format="webp" :loading="loading" />
</template>

<script setup>
defineProps({
  loading: {
    type: String,
    default: "lazy"
  }
});
</script>
