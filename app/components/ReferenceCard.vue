<template>
  <div
    class="shadow-primary-950/25 flex h-full max-w-lg min-w-[calc(100vw-5rem)] flex-col rounded-md shadow-lg sm:min-w-96"
  >
    <div class="bg-primary-200/50 flex grow flex-col gap-1 rounded-t-md p-8">
      <span class="text-primary-500 text-xs">{{ data.year }}</span>
      <span class="h3">{{ data.title }}</span>
      <p class="mt-3">{{ data.description }}</p>
    </div>
    <ul
      class="divide-primary-300 bg-primary-200/75 flex shrink-0 flex-wrap gap-x-2 gap-y-1 divide-x rounded-b-md px-8 py-4"
    >
      <li v-for="link in data.links" :key="link.url" class="first:not-last:pr-2">
        <a :href="link.url" target="_blank" class="flex items-center gap-1 text-xs">
          {{ link.title }}
          <img src="assets/icons/link.svg" alt="External Link" class="size-4" />
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
defineProps<{ data: Record<string, any> }>();
</script>
