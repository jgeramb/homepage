<template>
  <DefaultLayout>
    <div class="relative grid grow place-items-center overflow-hidden py-8">
      <div
        v-if="is404"
        ref="animationContainer"
        class="invisible relative flex justify-center gap-8 px-8 md:gap-16"
      >
        <div
          ref="ball"
          class="absolute bottom-1 size-4 rounded-full bg-gradient-radial from-primary-300 to-primary-400 drop-shadow-lg will-change-transform md:size-8"
        ></div>

        <svg
          v-for="index in 3"
          :key="index"
          width="48"
          height="48"
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
          class="cup"
        >
          <path
            d="M256 64C384 16 640 16 768 64C832 148.375 896 1024 896 1024H128C128 1024 192 148.375 256 64Z"
          />
        </svg>
      </div>
      <div
        ref="infoContainer"
        class="absolute flex h-full flex-col justify-center text-balance px-8 text-center max-md:max-w-sm"
        :class="{ invisible: is404 }"
      >
        <h1 class="font-title text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
          {{ is404 ? "Oh no, where did the page go?!" : "An unexpected error occurred" }}
        </h1>
        <p class="mt-4 md:text-xl">
          {{
            is404
              ? "I've looked everywhere, but couldn't find it&hellip;"
              : "Try again later or contact me if the error persists."
          }}
        </p>
        <StyledButton
          secondary
          class="mx-auto mt-8 !px-8 !text-base"
          @click="navigateTo(useRequestHeader('Referrer') || '/')"
        >
          Go back
        </StyledButton>
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup>
import DefaultLayout from "~/layouts/default.vue";

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

  function animateCup(cup, xPosition, onComplete = undefined) {
    const timeline = gsap.timeline({
      defaults: {
        duration: 0.25,
        ease: "power3.inOut"
      },
      onComplete
    });
    timeline.set(cup, { zIndex: cup === randomCup ? 10 : -10 });
    timeline.to(cup, { yPercent: 37.5 * (cup === randomCup ? 1 : -1) });
    timeline.to(cup, { x: xPosition - initialXPositions.get(cup) }, "<25%");
    timeline.to(cup, { yPercent: 0 }, "<25%");
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
    timeline.set(cups, { y: -ballSize - CUP_LIFT_GAP });
    timeline.to(animationContainer.value, { autoAlpha: 1 });
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
  @apply relative drop-shadow-lg will-change-transform md:size-16;
}
</style>
