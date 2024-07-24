<template>
  <div>
    <HeroSection class="flex w-full items-center justify-center">
      <ImageAsset
        src="hanseforum.jpeg"
        alt="Hanseforum"
        height="768"
        sizes="320px sm:640px md:768px lg:1024px xl:1280px 2xl:1536px"
        fit="cover"
        :modifiers="{ position: 'right bottom' }"
        loading="eager"
        class="h-[calc(var(--vh,1vh)*100-5rem)] w-full object-cover brightness-50 md:h-[calc(var(--vh,1vh)*100-6.3125rem)]"
      />
      <div class="absolute flex flex-col gap-4 px-8 text-center">
        <h1
          class="font-title text-4xl !leading-snug tracking-tight text-primary-50 drop-shadow-md lg:text-6xl"
        >
          {{ Math.floor((Date.now() - new Date("2017-02-01").getTime()) / (1000 * 60 * 60 * 24 * 365.25)) }}
          years of experience
        </h1>
      </div>
    </HeroSection>
    <div class="border-t border-t-primary-200 px-8 pt-8">
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
