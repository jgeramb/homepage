<template>
  <p
    ref="titleRef"
    class="font-title w-full overflow-hidden leading-none whitespace-nowrap opacity-0 will-change-[opacity]"
  >
    <slot />
  </p>
</template>

<script setup lang="ts">
import { useTransitionListener } from "#layers/base/app/composables/transition/listener";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

const MIN_LETTER_SPACING_IN_EM = 0.25;

const titleRef = useTemplateRef("titleRef");
let context: CanvasRenderingContext2D | null = null;

function measureTextWidth(text: string, letterSpacing: number, fontSize: number) {
  if (!context) {
    context = document.createElement("canvas").getContext("2d");

    if (!context) return 0;
  }

  context.font = `${fontSize}px "Outfit", "Helvetica Neue", "Helvetica", "sans-serif"`;

  return context.measureText(text).width + (text.length - 1) * letterSpacing;
}

function calcMinFontSize(element: HTMLElement, fontSize: number = 128) {
  const textWidth = measureTextWidth(element.innerText, fontSize * MIN_LETTER_SPACING_IN_EM, fontSize);

  if (textWidth > element.clientWidth) {
    return calcMinFontSize(element, fontSize - 1);
  }

  return fontSize;
}

function updateFontSize() {
  if (!titleRef.value) return;

  const fontSize = calcMinFontSize(titleRef.value);

  const fullTextWidth = measureTextWidth(titleRef.value.innerText, 0, fontSize);
  const whitespaceWidth = titleRef.value.clientWidth - fullTextWidth;
  const letterCount = titleRef.value.innerText.length;

  titleRef.value.style.fontSize = `${fontSize}px`;
  titleRef.value.style.letterSpacing = `${whitespaceWidth / letterCount}px`;
}

useTransitionListener(() => {
  if (!titleRef.value) return;

  updateFontSize();

  titleRef.value.style.opacity = "1";

  gsap.registerPlugin(ScrollTrigger);

  let animation: gsap.core.Tween | null = null;

  SplitText.create(titleRef.value, {
    type: "chars",
    autoSplit: true,
    onSplit(split: SplitText) {
      animation?.kill();
      animation = gsap.fromTo(
        split.chars,
        { opacity: 0, xPercent: 50 },
        {
          opacity: 1,
          xPercent: 0,
          duration: 0.3,
          stagger: 0.01,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.value,
            start: "top 90%"
          }
        }
      );
    }
  });
});
useEventListener("resize", updateFontSize, true);
</script>
