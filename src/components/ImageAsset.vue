<template>
  <img
    :src="this.assetUrl('/assets/' + this.fileName)"
    :alt="this.alt"
    :width="this.width"
    :height="this.height"
    :loading="this.eager ? 'eager' : 'lazy'"
  />
</template>

<script>
const icons = import.meta.globEager('@/assets/**/*');

export default {
  props: {
    fileName: String,
    alt: String,
    width: Number,
    height: Number,
    eager: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    assetUrl(name) {
      return icons[Object.keys(icons).find((path) => path.endsWith(name))]?.default;
    }
  }
};
</script>
