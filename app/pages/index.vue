<template>
  <main class="flex flex-col gap-8">
    <HeroSection
      class="grid w-full gap-x-24 gap-y-8 *:w-full lg:max-w-6xl lg:grid-cols-[4fr_3fr] lg:items-center lg:px-8 lg:pt-8"
    >
      <MediaQueryRestrictedPictureAsset
        src="portrait-mobile.jpeg"
        sizes="271px xs:583px sm:719px md:975px"
        height="512"
        media-query="(max-width: 1023px)"
        negated-media-query="(min-width: 1024px)"
        :modifiers="{ fit: 'cover', position: 'top' }"
        preload
        loading="eager"
        :img-attributes="{ class: 'h-128 object-cover', alt: 'Justus Geramb' }"
        class="lg:hidden"
      />
      <div class="flex flex-col items-start gap-4 max-lg:px-8">
        <h1 class="h1 normal-case">
          Hi, my name is
          <span class="from-accent/75 to-accent bg-linear-to-br bg-clip-text text-transparent">Justus</span>.
        </h1>
        <p class="mt-2 leading-relaxed! lg:text-lg">
          I'm a full stack software developer from <span class="text-primary-500">Hamburg, Germany</span>.
        </p>
        <p class="leading-relaxed! lg:text-lg">
          I build blazingly fast web applications with a focus on search engine optimization and user
          experience.
        </p>
        <StyledButton primary class="mt-8 lg:text-lg" @click="navigateTo('/about')">
          Learn more about me
        </StyledButton>
      </div>
      <MediaQueryRestrictedPictureAsset
        src="portrait.jpeg"
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
    <div class="border-primary-200 border-y p-8">
      <FullWidthTitle class="uppercase">
        Dreamer<span class="text-accent">Entrepreneur</span>Developer
      </FullWidthTitle>
    </div>
    <HomeReferences />
  </main>
</template>

<script setup lang="ts">
useHeadSEO(true, "Justus Geramb", "Justus Geramb", "Dreamer. Entrepreneur. Developer.", "/");
</script>
