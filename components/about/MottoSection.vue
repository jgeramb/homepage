<template>
  <section class="relative">
    <ImageAsset
      src="bridge.jpeg"
      alt="Bridge"
      height="1280"
      sizes="320px sm:640px md:768px lg:1024px xl:1280px 2xl:1536px"
      fit="cover"
      :modifiers="{ position: 'top' }"
      class="-mt-2 h-[1280px] w-full object-cover [mask-image:linear-gradient(to_bottom,black_80%,transparent)]"
    />
    <div
      class="absolute inset-x-0 top-[max(42.5vw,38rem)] z-10 mx-auto max-w-6xl px-8 font-title tracking-tight text-primary-50"
    >
      <blockquote>
        <p class="text-[min(5.5vw,3.25rem)] !leading-snug">
          Fix the cause, not the symptom, to achieve a long-term solution.
        </p>
      </blockquote>
      <p class="mt-8 text-primary-400 md:text-xl">&horbar; that's my motto</p>
    </div>
  </section>
</template>
<script setup lang="ts"></script>
