<template>
  <div class="*:w-full">
    <HeroSection class="flex items-center justify-center bg-black">
      <ImageAsset
        src="hanseforum.jpeg"
        alt="Hanseforum"
        height="768"
        sizes="320px sm:640px md:768px lg:1024px xl:1280px 2xl:1536px"
        fit="cover"
        :modifiers="{ position: 'right bottom' }"
        loading="eager"
        class="h-[calc(var(--vh,1vh)*100-5rem)] w-full object-cover brightness-50 [mask-image:linear-gradient(to_bottom,black_75%,transparent)] md:h-[calc(var(--vh,1vh)*100-6.3125rem)]"
      />
      <div class="absolute px-8 text-center uppercase tracking-widest text-primary-50 *:drop-shadow-md">
        <h1>My journey</h1>
        <p class="text-xs lg:text-lg">as a software developer</p>
      </div>
    </HeroSection>
    <AboutSkillsSection class="-translate-y-px" />
    <AboutMottoSection />
    <AboutCareerSection @animation-done="$refs['cta'].createScrollTrigger()" />
    <AboutCallToActionSection ref="cta" />
  </div>
</template>

<script setup>
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
              "item": "${useRuntimeConfig().public.baseURL}/about"
            }
          ]
        }`
    }
  ]
});
</script>
