<template>
  <div class="flex flex-col gap-8 *:px-6">
    <HeroSection class="grid gap-x-24 gap-y-8 *:w-full lg:grid-cols-[4fr_3fr] lg:items-center">
      <ImageAsset
        src="portrait-mobile.jpeg"
        alt="Justus Geramb"
        height="448"
        sizes="271px xs:583px sm:719px md:975px"
        fit="cover"
        :modifiers="{ position: 'top' }"
        loading="eager"
        class="h-[28rem] object-cover lg:hidden"
      />
      <div>
        <h2 class="text-3xl leading-snug lg:text-4xl">
          Hi, my name is
          <span class="bg-gradient-to-br from-accent/75 to-accent bg-clip-text text-transparent">Justus</span
          >.
        </h2>
        <p class="mt-4 !leading-relaxed md:text-lg">
          I'm a full stack software developer from Hamburg, Germany.
        </p>
        <p class="mt-8 !leading-relaxed md:text-lg">
          I build blazingly fast web applications with a focus on search engine optimization and user
          experience.
        </p>
        <StyledButton primary class="mt-8 !text-base" @click="navigateTo('/about')">
          Learn more about me
        </StyledButton>
      </div>
      <ImageAsset
        src="portrait.jpeg"
        alt="Justus Geramb"
        width="4125"
        height="6188"
        sizes="432px"
        loading="eager"
        preload
        class="max-lg:hidden"
      />
    </HeroSection>
    <div class="border-y border-primary-200 py-8">
      <FullWidthTitle class="uppercase">
        Dreamer<span class="text-accent">Entrepreneur</span>Developer
      </FullWidthTitle>
    </div>
  </div>
</template>

<script setup>
import ImageAsset from "~/components/ImageAsset.vue";

useHeadSEO(true, "Justus Geramb", "Justus Geramb", "Dreamer. Entrepreneur. Developer.", "/");
</script>

<style scoped lang="scss">
img {
  @apply rounded-xl shadow-md shadow-primary-950/25;
}
</style>
