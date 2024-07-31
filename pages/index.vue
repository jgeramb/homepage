<template>
  <div class="flex flex-col gap-8">
    <HeroSection
      class="grid gap-x-24 gap-y-8 *:w-full lg:max-w-6xl lg:grid-cols-[4fr_3fr] lg:items-center lg:px-8 lg:pt-8"
    >
      <ImageAsset
        src="portrait-mobile.jpeg"
        alt="Justus Geramb"
        height="512"
        sizes="271px xs:583px sm:719px md:975px"
        fit="cover"
        :modifiers="{ position: 'top' }"
        loading="eager"
        densities="x1 x2 x3"
        class="h-[32rem] object-cover lg:hidden"
      />
      <div class="flex flex-col items-start gap-4 max-lg:px-8">
        <h1 class="normal-case">
          Hi, my name is
          <span class="bg-gradient-to-br from-accent/75 to-accent bg-clip-text text-transparent">Justus</span
          >.
        </h1>
        <p class="mt-2 !leading-relaxed lg:text-lg">
          I'm a full stack software developer from <span class="opacity-50">Hamburg, Germany</span>.
        </p>
        <p class="!leading-relaxed lg:text-lg">
          I build blazingly fast web applications with a focus on search engine optimization and user
          experience.
        </p>
        <StyledButton primary class="mt-8 lg:text-lg" @click="navigateTo('/about')">
          Learn more about me
        </StyledButton>
      </div>
      <ImageAsset
        src="portrait.jpeg"
        alt="Justus Geramb"
        width="4125"
        height="6188"
        sizes="426px"
        loading="eager"
        preload
        class="rounded-xl shadow-md shadow-primary-950/25 max-lg:hidden"
      />
    </HeroSection>
    <div class="border-y border-primary-200 p-8">
      <FullWidthTitle class="uppercase">
        Dreamer<span class="text-accent">Entrepreneur</span>Developer
      </FullWidthTitle>
    </div>
  </div>
</template>

<script setup>
useHeadSEO(true, "Justus Geramb", "Justus Geramb", "Dreamer. Entrepreneur. Developer.", "/");
</script>
