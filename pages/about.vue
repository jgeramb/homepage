<template>
  <div class="flex flex-col gap-8 pt-8 *:px-8">
    <Archery />
    <div class="border-t border-t-primary-200 pt-8">
      <blockquote>
        <p class="text-[min(5.5vw,3.25rem)] !leading-relaxed *:opacity-50">
          <span>&quot;</span>
          Fix the cause, not the symptom, to achieve a long-term solution.
          <span>&quot;</span>
        </p>
      </blockquote>
      <p class="mt-4 font-title tracking-widest md:text-lg">&horbar; that's my motto</p>
    </div>
  </div>
</template>

<script setup>
useHeadSEO(true, "About • Justus Geramb", "About", "My career as a software developer.", "/about");
</script>
