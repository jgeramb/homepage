<template>
  <div class="flex w-full flex-col">
    <span class="text-sm text-primary-500">{{ data.year }}</span>
    <h2 class="mt-2">{{ data.title }}</h2>
    <p class="mt-4 max-w-4xl !leading-relaxed lg:text-lg">{{ data.description }}</p>
    <ul class="mt-8 flex flex-wrap gap-4">
      <li v-for="link in data.links">
        <a class="link" :href="link.url" target="_blank">
          {{ link.title }}
          <img src="assets/icons/link.svg" alt="External Link" />
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup>
defineProps({ data: Object });
</script>

<style lang="scss" scoped>
.link {
  @apply flex items-center gap-2 rounded-md bg-primary-200 px-4 py-2 text-sm transition-colors duration-300 hover:bg-primary-300;

  img {
    @apply size-4;
  }
}
</style>
