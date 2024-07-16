<template>
  <source :media="media" :srcset="optimizedImg.srcset" :sizes="optimizedImg.sizes" />
</template>

<script setup>
const props = defineProps({ src: String, media: String });

const img = useImage();

const optimizedImg = computed(() => {
  return img.getSizes(props.src, {
    sizes:
      "100vw " +
      Object.keys(img.options.screens)
        .map((key) => `${key}:${img.options.screens[key]}px`)
        .join(" "),
    modifiers: {
      format: "webp"
    }
  });
});
</script>
