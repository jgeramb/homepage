<template>
  <footer class="flex items-center justify-between gap-4 bg-primary-800 px-4 py-2">
    <p class="gap-1 text-sm text-primary-300">
      &copy; 2023{{ year > 2023 ? ` - ${year}` : "" }}
      Justus G.
    </p>
    <a :href="isImprint ? '/' : '/imprint'" class="flex items-center gap-1 text-primary-50">
      <span class="material-symbols-rounded text-sm">link</span>
      {{ isImprint ? "Home" : "Imprint" }}
    </a>
  </footer>
</template>

<script setup>
const isImprint = window.location.pathname.startsWith("/imprint");
const year = new Date().getFullYear();
</script>
