<template>
  <main class="-mb-16 flex flex-col gap-8">
    <HeroSection
      class="grid w-full gap-x-24 gap-y-8 *:w-full lg:max-w-6xl lg:grid-cols-[4fr_3fr] lg:items-center lg:px-8 lg:pt-8"
    >
      <MediaQueryRestrictedPictureAsset
        src="work-laptop.jpeg"
        sizes="271px xs:583px sm:719px md:975px"
        height="512"
        media-query="(max-width: 1023px)"
        negated-media-query="(min-width: 1024px)"
        :modifiers="{ fit: 'cover', position: 'bottom' }"
        preload
        loading="eager"
        :img-attributes="{ class: 'h-128 object-cover', alt: 'Justus Geramb' }"
        class="lg:hidden"
      />
      <div class="flex flex-col items-start gap-4 max-lg:px-8">
        <h1 class="h1 normal-case">References</h1>
        <p class="leading-relaxed! lg:text-lg">Below are some projects that I have been working on.</p>
      </div>
      <MediaQueryRestrictedPictureAsset
        src="work-laptop.jpeg"
        sizes="426px"
        height="576"
        media-query="(min-width: 1024px)"
        negated-media-query="(max-width: 1023px)"
        :modifiers="{ fit: 'cover', position: 'top' }"
        preload
        loading="eager"
        :img-attributes="{
          class: 'shadow-primary-950/25 rounded-xl shadow-lg',
          alt: 'Justus Geramb'
        }"
        class="max-lg:hidden"
      />
    </HeroSection>
    <div
      ref="itemsWrapperRef"
      class="divide-primary-200 border-primary-200 mx-auto flex w-full max-w-6xl flex-col gap-16 divide-y border-t px-8 pt-24 pb-16 [&_>:not(:first-child)]:pt-16"
    >
      <ReferencesItem v-for="item in items" :key="item.title" :data="item" />
    </div>
    <LazyReferencesArchery />
  </main>
</template>

<script setup lang="ts">
import { useTransitionListener } from "#layers/base/app/composables/transition/listener";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const { data: items } = await useReferenceItems();

const itemsWrapperRef = useTemplateRef("itemsWrapperRef");

useTransitionListener(() => {
  gsap.registerPlugin(ScrollTrigger);

  Array.from(itemsWrapperRef.value!.children).forEach((item) => {
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
            "item": "${useRuntimeConfig().public.baseUrl}/references"
          }
        ]
      }`
    }
  ]
});
</script>
