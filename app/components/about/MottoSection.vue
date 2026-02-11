<template>
  <section class="relative">
    <NuxtImg
      src="bridge.jpeg"
      alt="Bridge"
      height="1280"
      sizes="320px sm:640px md:768px lg:1024px xl:1280px 2xl:1536px"
      :modifiers="{ fit: 'cover', position: 'top' }"
      loading="lazy"
      class="-mt-2 h-320 w-full mask-[linear-gradient(to_bottom,black_85%,transparent)] object-cover"
      @load="() => ScrollTrigger.refresh()"
    />
    <div
      ref="containerRef"
      class="font-title text-primary-50 absolute inset-x-0 bottom-[max(5vw,12rem)] z-10 mx-auto max-w-6xl px-8"
    >
      <blockquote>
        <p ref="quoteRef" class="text-5xl/snug tracking-tight">
          Fix the cause, not the symptom,<br />
          to achieve a long-term solution.
        </p>
        <cite ref="subtitleRef" class="text-primary-400 mt-8 block text-xl not-italic">
          &horbar; that's my motto
        </cite>
      </blockquote>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useTransitionListener } from "#layers/base/app/composables/transition/listener";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

const containerRef = useTemplateRef("containerRef");
const quoteRef = useTemplateRef("quoteRef");
const subtitleRef = useTemplateRef("subtitleRef");

useTransitionListener(async () => {
  gsap.registerPlugin(ScrollTrigger);

  const timeline = gsap.timeline({
    defaults: { opacity: 0, yPercent: 25, duration: 0.5, ease: "power3.inOut" },
    scrollTrigger: {
      trigger: containerRef.value,
      start: "top 90%"
    }
  });

  SplitText.create(quoteRef.value, {
    type: "lines, words, chars",
    autoSplit: true,
    onSplit(split: SplitText) {
      timeline.clear();
      timeline.from(split.chars, { stagger: 0.01 });
      timeline.from(subtitleRef.value, {});
    }
  });
});
</script>
