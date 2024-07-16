<template>
  <div class="grid min-h-dvh place-items-center">
    <div v-if="is404" ref="animationContainer" class="invisible relative flex justify-center gap-8">
      <div
        ref="ball"
        class="absolute bottom-0 size-4 rounded-full bg-highlight will-change-transform md:size-8"
      ></div>

      <div class="cup bg-primary-900"></div>
      <div class="cup bg-primary-600"></div>
      <div class="cup bg-primary-300"></div>
    </div>
    <div
      ref="infoContainer"
      class="absolute flex flex-col justify-center text-balance px-8 text-center max-md:max-w-sm"
      :class="{ invisible: is404 }"
    >
      <h1 class="font-title text-3xl font-semibold leading-tight md:text-4xl">
        {{ is404 ? "Oh no, where did the page go?!" : "An unexpected error occurred" }}
      </h1>
      <p class="mt-2 md:text-lg">
        {{
          is404
            ? "I've looked everywhere, but couldn't find it &hellip;"
            : "Try again later or contact me if the error persists."
        }}
      </p>
      <NuxtLink :to="useRequestHeader('Referrer') || '/'" class="mx-auto mt-8 text-primary-500 underline">
        Go back
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({ error: Object });
const is404 = computed(() => props.error.statusCode === 404);

import { gsap } from "gsap";

const animationContainer = ref();
const infoContainer = ref();
const ball = ref();

onMounted(() => {
  if (!is404.value) return;

  const ITERATIONS = 3;
  const CUP_LIFT_GAP = 12;

  const cups = Array.from(document.getElementsByClassName("cup"));
  const initialXPositions = new Map(cups.map((cup) => [cup, cup.getBoundingClientRect().x]));

  function animateCup(cup, xPosition, onComplete = undefined) {
    const timeline = gsap.timeline({
      defaults: {
        duration: 0.25,
        ease: "power3.inOut"
      },
      onComplete
    });
    timeline.to(cup, { yPercent: 37.5 });
    timeline.to(cup, { x: xPosition - initialXPositions.get(cup) }, "<25%");
    timeline.to(cup, { yPercent: 0 }, "<25%");
  }

  function getRandomCup() {
    return cups[Math.floor(Math.random() * cups.length)];
  }

  const { x: initialBallX, width: ballSize } = ball.value.getBoundingClientRect();
  const randomCup = getRandomCup();

  function getBallX() {
    const randomCupRect = randomCup.getBoundingClientRect();
    const ballWidth = ball.value.getBoundingClientRect().width;

    return randomCupRect.x - initialBallX + (randomCupRect.width - ballWidth) / 2;
  }

  function mixCups(iteration = 1) {
    let otherCup;

    do {
      otherCup = getRandomCup();
    } while (otherCup === randomCup);

    animateCup(randomCup, otherCup.getBoundingClientRect().x);
    animateCup(otherCup, randomCup.getBoundingClientRect().x, async () => {
      await nextTick();

      cups.sort((a, b) => a.getBoundingClientRect().x - b.getBoundingClientRect().x);

      if (iteration < ITERATIONS) mixCups(iteration + 1);
      else if (iteration === ITERATIONS) {
        gsap.set(ball.value, { x: getBallX(), opacity: 1 });

        const timeline = gsap.timeline({
          defaults: { duration: 0.5, ease: "power3.inOut", stagger: 0.05 },
          onComplete: () => mixCups(iteration + 1)
        });
        timeline.to(cups, { y: -ballSize - CUP_LIFT_GAP });
        timeline.to(cups, { y: 0 }, "+=0.5");
        timeline.set(ball.value, { opacity: 0 });
      } else if (iteration === ITERATIONS + 1) {
        const timeline = gsap.timeline({
          defaults: { duration: 1 }
        });
        timeline.to(cups, {
          y: -ballSize - CUP_LIFT_GAP,
          duration: 0.5,
          ease: "power3.inOut",
          stagger: 0.05
        });
        timeline.to(animationContainer.value, { autoAlpha: 0, scale: 0.25, ease: "expo.inOut" }, "+=0.5");
        timeline.fromTo(
          infoContainer.value,
          { scale: 0.25 },
          { autoAlpha: 1, scale: 1, ease: "elastic.out" },
          ">-25%"
        );
      }
    });
  }

  function beginAnimation() {
    const timeline = gsap.timeline({
      defaults: { duration: 0.5, ease: "power3.inOut", stagger: 0.05 },
      onComplete: mixCups,
      delay: 0.5
    });
    timeline.to(animationContainer.value, { autoAlpha: 1 });
    timeline.to(cups, { y: -ballSize - CUP_LIFT_GAP });
    timeline.to(ball.value, {
      x: getBallX(),
      ease: "expo.inOut"
    });
    timeline.to(cups, { y: 0 });
    timeline.set(ball.value, { opacity: 0 });
  }

  if (document.readyState === "complete") beginAnimation();
  else
    document.addEventListener("readystatechange", () => {
      if (document.readyState === "complete") beginAnimation();
    });
});

useHeadSEO(
  false,
  () => `${is404.value ? "Not Found" : "Unexpected Error"} • Justus Geramb`,
  () => (is404.value ? "Not Found" : "Unexpected Error"),
  () => (is404.value ? "This page does not exist." : "An unexpected error occurred."),
  () => useRoute().path
);
</script>

<style scoped lang="scss">
.cup {
  @apply relative h-12 w-6 overflow-clip will-change-transform before:left-[0.25rem] after:left-[1.25rem] after:-scale-y-100 md:h-24 md:w-12 md:before:left-[0.5rem] md:after:left-[2.5rem];

  &::after,
  &::before {
    @apply absolute -translate-x-1/2 -translate-y-1/2 rotate-90 border-solid border-[transparent_transparent_theme('colors.primary.100')_transparent] content-[''] [border-width:0.25rem_3rem_0.25rem] md:[border-width:0.5rem_6rem_0.5rem];
  }
}
</style>
