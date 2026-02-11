<template>
  <div class="flex w-full flex-col">
    <span class="text-primary-500 text-sm">{{ data.year }}</span>
    <h2 class="h2 mt-2">{{ data.title }}</h2>
    <p class="mt-4 max-w-4xl leading-relaxed! lg:text-lg">{{ data.description }}</p>
    <ul class="mt-8 flex flex-wrap gap-x-4 gap-y-2">
      <li v-for="link in data.links" :key="link.url">
        <a class="link" :href="link.url" target="_blank">
          {{ link.title }}
          <img src="assets/icons/link.svg" alt="External Link" />
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
defineProps<{ data: Record<string, any> }>();
</script>

<style scoped>
@reference "../../assets/css/tailwind.css";

.link {
  @apply bg-primary-200 hover:bg-primary-300 flex items-center gap-2 rounded-md px-4 py-2 text-sm transition-colors duration-300;

  img {
    @apply size-4;
  }
}
</style>
