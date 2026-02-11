<template>
  <main class="*:w-full">
    <HeroSection class="flex items-center justify-center bg-black">
      <NuxtImg
        src="hanseforum.jpeg"
        alt="Hanseforum"
        height="768"
        sizes="320px sm:640px md:768px lg:1024px xl:1280px 2xl:1536px"
        fit="cover"
        :modifiers="{ position: 'right bottom' }"
        loading="eager"
        class="h-[calc(100dvh-5rem)] w-full mask-[linear-gradient(to_bottom,black_75%,transparent)] object-cover brightness-50 md:h-[calc(100dvh-6.3125rem)]"
        @load="() => ScrollTrigger.refresh()"
      />
      <div class="text-primary-50 absolute px-8 text-center tracking-widest uppercase *:drop-shadow-md">
        <h1 class="h1">My journey</h1>
        <p class="text-xs lg:text-lg">as a software developer</p>
      </div>
    </HeroSection>
    <AboutSkillsSection class="-translate-y-px" />
    <AboutMottoSection />
    <AboutCareerSection />
    <AboutCallToActionSection />
  </main>
</template>

<script setup lang="ts">
useHeadSEO(true, "About • Justus Geramb", "About", "My career as a software developer.", "/about");
useHead({
  script: [
    {
      type: "application/ld+json",
      innerHTML: `{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "About",
            "item": "${useRuntimeConfig().public.baseUrl}/about"
          }
        ]
      }`
    }
  ]
});

import { ScrollTrigger } from "gsap/ScrollTrigger";
</script>
