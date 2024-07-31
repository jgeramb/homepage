<template>
  <div
    class="flex h-full min-w-[calc(100vw-5rem)] max-w-lg flex-col rounded-md shadow-lg shadow-primary-950/25 sm:min-w-96"
  >
    <div class="grow rounded-t-md bg-primary-200/50 p-8">
      <span class="text-xs text-primary-500">{{ data.year }}</span>
      <h3 class="mt-1">{{ data.title }}</h3>
      <p class="mt-4">{{ data.description }}</p>
    </div>
    <ul
      class="flex shrink-0 flex-wrap gap-x-2 gap-y-1 divide-x divide-primary-300 rounded-b-md bg-primary-200/75 px-8 py-4 [&_>:not(:first-child)]:pl-2"
    >
      <li v-for="link in data.links" :key="link.url">
        <a :href="link.url" target="_blank" class="flex items-center gap-1 text-xs">
          {{ link.title }}
          <img src="assets/icons/link.svg" alt="External Link" class="size-4" />
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup>
defineProps({ data: Object });
</script>
