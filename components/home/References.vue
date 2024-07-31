<template>
  <div class="w-full pt-8">
    <h2 class="w-full px-8">References</h2>
    <div ref="scrollContainer" class="no-scrollbar w-full overflow-x-auto py-8">
      <ul ref="wrapper" class="flex w-fit gap-8 px-8">
        <li v-for="item in referenceItems" :key="item.title">
          <ReferenceCard :data="item" />
        </li>
        <li
          class="flex min-w-[calc(100vw-5rem)] flex-col gap-4 rounded-md bg-accent p-8 text-primary-50 shadow-inner shadow-primary-950/25 md:min-w-96"
        >
          <h3>More references</h3>
          <p class="grow">To see more references, click the button below.</p>
          <StyledButton tertiary class="mt-4" @click="navigateTo('/references')">Show me more!</StyledButton>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
const { data: referenceItems } = await useAsyncData("references_items", () =>
  queryContent("references")
    .only(["title", "year", "description", "links"])
    .sort({ year: -1 })
    .limit(3)
    .find()
);

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const wrapper = ref();

useTransitionListener(() => {
  gsap.registerPlugin(ScrollTrigger);
  gsap.from(wrapper.value.children, {
    opacity: 0,
    xPercent: 10,
    duration: 0.5,
    ease: "power3.inOut",
    stagger: 0.1,
    scrollTrigger: {
      trigger: wrapper.value,
      start: "top 90%"
    }
  });
});

const scrollContainer = ref();
let scrollX = 0;
let initialX = -1;

function scroll(clientX) {
  let newScrollX = scrollX + (initialX - clientX);
  newScrollX = Math.min(scrollContainer.value.scrollWidth - scrollContainer.value.clientWidth, newScrollX);
  newScrollX = Math.max(0, newScrollX);

  scrollContainer.value.scrollLeft = newScrollX;
}

useEventListener(
  "mousedown",
  (event) => {
    event.preventDefault();
    event.stopImmediatePropagation();

    initialX = event.clientX;
  },
  false,
  scrollContainer
);
useEventListener(
  "mousemove",
  (event) => {
    if (initialX === -1) return;

    event.preventDefault();

    scroll(event.clientX);
  },
  false,
  scrollContainer
);
useEventListener(
  "mouseup",
  (event) => {
    if (initialX === -1) return;

    scroll(event.clientX);

    scrollX = scrollContainer.value.scrollLeft;
    initialX = -1;
  },
  true,
  scrollContainer
);
</script>
