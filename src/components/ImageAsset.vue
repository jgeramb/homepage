<template>
  <img :src="getAssetUrl(`/assets/${fileName}`)" :alt="alt" :width="width" :height="height" :loading="eager ? 'eager' : 'lazy'" />
</template>

<script setup>
defineProps({
  fileName: String,
  alt: String,
  width: Number,
  height: Number,
  eager: {
    type: Boolean,
    default: false
  }
});

const icons = import.meta.globEager("@/assets/**/*");

const getAssetUrl = (name) => icons[Object.keys(icons).find((path) => path.endsWith(name))]?.default;
</script>
