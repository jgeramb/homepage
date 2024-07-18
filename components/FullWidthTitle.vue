<template>
  <h1 ref="title" class="w-full overflow-hidden whitespace-nowrap font-title tracking-[0.25em] opacity-0">
    <slot />
  </h1>
</template>

<script setup>
import { gsap } from "gsap";

const title = ref();
let context;

function measureTextWidth(text, fontSize) {
  if (!context) {
    const canvas = document.createElement("canvas");

    context = canvas.getContext("2d");
    context.letterSpacing = "0.25em";
  }

  context.font = `${fontSize}px "Outfit", "Helvetica Neue", "Helvetica", "sans-serif"`;

  return context.measureText(text).width;
}

function calcMinFontSize(element, fontSize = 128) {
  const textWidth = measureTextWidth(element.innerText, fontSize);

  if (textWidth > element.clientWidth) {
    return calcMinFontSize(element, fontSize - 1);
  }

  return fontSize;
}

function updateFontSize() {
  const fontSize = calcMinFontSize(title.value);

  const fullTextWidth = measureTextWidth(title.value.innerText, fontSize);
  const whitespaceWidth = title.value.clientWidth - fullTextWidth;
  const letterCount = title.value.innerText.length;

  title.value.style.fontSize = `${fontSize}px`;
  title.value.style.letterSpacing = `calc(0.25em + ${whitespaceWidth / letterCount}px)`;
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
