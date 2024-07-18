<template>
  <h1 ref="title" class="w-full overflow-hidden whitespace-nowrap font-title opacity-0">
    <slot />
  </h1>
</template>

<script setup>
import { gsap } from "gsap";

const MIN_LETTER_SPACING_IN_EM = 0.25;

const title = ref();
let context;

function measureTextWidth(text, letterSpacing, fontSize) {
  if (!context) {
    context = document.createElement("canvas").getContext("2d");
  }

  context.font = `${fontSize}px "Outfit", "Helvetica Neue", "Helvetica", "sans-serif"`;

  return context.measureText(text).width + (text.length - 1) * letterSpacing;
}

function calcMinFontSize(element, fontSize = 128) {
  const textWidth = measureTextWidth(element.innerText, fontSize * MIN_LETTER_SPACING_IN_EM, fontSize);

  if (textWidth > element.clientWidth) {
    return calcMinFontSize(element, fontSize - 1);
  }

  return fontSize;
}

function updateFontSize() {
  const fontSize = calcMinFontSize(title.value);

  const fullTextWidth = measureTextWidth(title.value.innerText, 0, fontSize);
  const whitespaceWidth = title.value.clientWidth - fullTextWidth;
  const letterCount = title.value.innerText.length;

  title.value.style.fontSize = `${fontSize}px`;
  title.value.style.letterSpacing = `${whitespaceWidth / letterCount}px`;
}

useTransitionListener(() => {
  updateFontSize();

  title.value.style.opacity = 1;

  splitText(title.value);

  gsap.fromTo(
    title.value.querySelectorAll("span:not(:has(> span))"),
    {
      opacity: 0,
      xPercent: 50
    },
    {
      opacity: 1,
      xPercent: 0,
      duration: 0.3,
      stagger: 0.01,
      ease: "power3.out"
    }
  );
});
useEventListener("resize", updateFontSize, true);
</script>
