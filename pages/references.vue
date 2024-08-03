<template>
  <div class="-mb-8 flex flex-col gap-8">
    <HeroSection
      class="grid w-full gap-x-24 gap-y-8 *:w-full lg:max-w-6xl lg:grid-cols-[4fr_3fr] lg:items-center lg:px-8 lg:pt-8"
    >
      <ImageAsset
        src="work-laptop.jpeg"
        alt="Justus Geramb"
        height="512"
        sizes="271px xs:583px sm:719px md:975px"
        fit="cover"
        :modifiers="{ position: 'bottom' }"
        loading="eager"
        densities="x1 x2 x3"
        class="h-[32rem] object-cover lg:hidden"
        @load="() => ScrollTrigger.refresh()"
      />
      <div class="flex flex-col items-start gap-4 max-lg:px-8">
        <h1 class="normal-case">References</h1>
        <p class="!leading-relaxed lg:text-lg">Below are some projects that I have been working on.</p>
      </div>
      <ImageAsset
        src="work-laptop.jpeg"
        alt="Justus Geramb"
        width="3475"
        height="4252"
        sizes="426px"
        loading="eager"
        preload
        class="rounded-xl shadow-lg shadow-primary-950/25 max-lg:hidden"
        @load="() => ScrollTrigger.refresh()"
      />
    </HeroSection>
    <div
      ref="itemsWrapper"
      class="mx-auto flex w-full max-w-6xl flex-col gap-16 divide-y divide-primary-200 border-t border-primary-200 px-8 pb-16 pt-24 [&_>:not(:first-child)]:pt-16"
    >
      <ReferencesItem v-for="item in items" :key="item.title" :data="item" />
    </div>
    <LazyReferencesArchery />
  </div>
</template>

<script setup>
useHeadSEO(true, "References • Justus Geramb", "References", "Some examples of my work.", "/references");
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
            "name": "References",
            "item": "${useRuntimeConfig().public.baseURL}/references"
          }
        ]
      }`
    }
  ]
});

const { data: items } = await useAsyncData("references_items", () =>
  queryContent("references").only(["title", "year", "description", "links"]).sort({ year: -1 }).find()
);

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const itemsWrapper = ref();

useTransitionListener(() => {
  gsap.registerPlugin(ScrollTrigger);

  Array.from(itemsWrapper.value.children).forEach((item) => {
    gsap.from(item, {
      yPercent: 25,
      opacity: 0,
      duration: 0.5,
      scrollTrigger: {
        trigger: item,
        start: "top 90%"
      }
    });
  });
});
</script>
