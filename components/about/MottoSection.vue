<template>
  <section ref="container" class="relative">
    <ImageAsset
      src="bridge.jpeg"
      alt="Bridge"
      height="1280"
      sizes="320px sm:640px md:768px lg:1024px xl:1280px 2xl:1536px"
      fit="cover"
      :modifiers="{ position: 'top' }"
      class="-mt-2 h-[1280px] w-full object-cover [mask-image:linear-gradient(to_bottom,black_85%,transparent)]"
      @load="() => ScrollTrigger.refresh()"
    />
    <div
      class="absolute inset-x-0 top-[max(42.5vw,38rem)] z-10 mx-auto max-w-6xl px-8 font-title tracking-tight text-primary-50"
    >
      <blockquote>
        <p ref="quote" class="text-[min(5.5vw,3.25rem)] !leading-snug">
          Fix the cause, not the symptom, to achieve a long-term solution.
        </p>
        <cite ref="subtitle" class="mt-8 block not-italic text-primary-400 md:text-xl">
          &horbar; that's my motto
        </cite>
      </blockquote>
    </div>
  </section>
</template>

<script setup>
const emit = defineEmits(["animationDone"]);

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const container = ref();
const quote = ref();
const subtitle = ref();

useTransitionListener(async () => {
  splitText(quote.value);

  await nextTick();

  gsap.registerPlugin(ScrollTrigger);

  const timeline = gsap.timeline({
    defaults: { opacity: 0, yPercent: 25, duration: 0.5, ease: "power3.inOut" },
    scrollTrigger: {
      trigger: container.value,
      start: "center 80%"
    },
    onComplete: () => emit("animationDone")
  });
  timeline.from(quote.value.getElementsByTagName("span"), { stagger: 0.01 });
  timeline.from(subtitle.value, {});
});
</script>
