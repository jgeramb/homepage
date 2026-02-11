<template>
  <div class="w-full pt-8">
    <h2 class="h2 w-full px-8">References</h2>
    <div ref="scrollContainerRef" class="no-scrollbar w-full overflow-x-auto py-8">
      <ul ref="wrapperRef" class="flex w-fit gap-8 px-8">
        <li v-for="item in referenceItems" :key="item.title">
          <ReferenceCard :data="item" />
        </li>
        <li
          class="bg-accent text-primary-50 shadow-primary-950/25 flex min-w-[calc(100vw-5rem)] flex-col gap-4 rounded-md p-8 shadow-inner md:min-w-96"
        >
          <span class="h3">More references</span>
          <p class="grow">To see more references, click the button below.</p>
          <StyledButton tertiary class="mt-4" @click="navigateTo('/references')">Show me more!</StyledButton>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTransitionListener } from "#layers/base/app/composables/transition/listener";

const { data: referenceItems } = await useReferenceItems();

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const wrapperRef = useTemplateRef("wrapperRef");

useTransitionListener(() => {
  gsap.registerPlugin(ScrollTrigger);
  gsap.from(wrapperRef.value!.children, {
    opacity: 0,
    xPercent: 10,
    duration: 0.5,
    ease: "power3.inOut",
    stagger: 0.1,
    scrollTrigger: {
      trigger: wrapperRef.value,
      start: "top 90%"
    }
  });
});

const scrollContainerRef = useTemplateRef("scrollContainerRef");
let scrollX = 0;
let initialX = -1;

function scroll(clientX: number) {
  if (!scrollContainerRef.value) return;

  let newScrollX = scrollX + (initialX - clientX);
  newScrollX = Math.min(
    scrollContainerRef.value.scrollWidth - scrollContainerRef.value.clientWidth,
    newScrollX
  );
  newScrollX = Math.max(0, newScrollX);

  scrollContainerRef.value.scrollLeft = newScrollX;
}

useEventListener<MouseEvent>(
  "mousedown",
  (event) => {
    event.preventDefault();
    event.stopImmediatePropagation();

    initialX = event.clientX;
  },
  false,
  scrollContainerRef
);
useEventListener<MouseEvent>(
  "mousemove",
  (event) => {
    if (initialX === -1) return;

    event.preventDefault();

    scroll(event.clientX);
  },
  false,
  scrollContainerRef
);
useEventListener<MouseEvent>(
  "mouseup",
  (event) => {
    if (initialX === -1) return;

    scroll(event.clientX);

    scrollX = scrollContainerRef.value!.scrollLeft;
    initialX = -1;
  },
  true,
  scrollContainerRef
);
</script>
