<template>
  <section class="mx-auto max-w-6xl px-8 pb-16 pt-24">
    <h2>Career</h2>
    <div id="timeline" class="mt-16">
      <ul>
        <li v-for="(item, index) in timelineItems" :key="index">
          <div></div>
          <div>
            <span>{{
              item.start_year + ((item.start_year !== item.end_year && ` - ${item.end_year || "now"}`) || "")
            }}</span>
            <h3>{{ item.title }}</h3>
            <span>{{ item.description }}</span>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const timelineItems = await queryContent("career").sort({ start_year: -1 }).find();

const emit = defineEmits(["animationDone"]);

useTransitionListener(() => {
  const timeline = document.querySelector("#timeline");
  const items = timeline.lastElementChild.children;

  gsap.registerPlugin(ScrollTrigger);

  let isFadingIn = false;
  let queue = [];

  Array.from(items).forEach((item, index) =>
    ScrollTrigger.create({
      trigger: item,
      start: "top 90%",
      onEnter() {
        function animate() {
          gsap.to(item.firstElementChild, {
            maxHeight: item.scrollHeight,
            duration: 0.5,
            ease: "linear",
            onStart: () => (item.firstElementChild.style.opacity = 1),
            onComplete() {
              if (queue.length > 0) queue.shift()();
              else isFadingIn = false;

              if (index === items.length - 1) emit("animationDone");
            }
          });
          gsap.to(item.lastElementChild, {
            opacity: 1,
            duration: 0.5,
            ease: "expo.in"
          });
        }

        if (!isFadingIn) {
          animate();

          isFadingIn = true;
        } else queue.push(animate);
      }
    })
  );
});
</script>

<style lang="scss" scoped>
li {
  @apply relative flex gap-16 [&:last-child_>:first-child]:h-12;

  &:first-child {
    @apply [&_:last-child]:pt-0;

    > :first-child {
      @apply mt-2 before:top-0;
    }
  }

  > :first-child {
    @apply relative max-h-0 w-0.5 shrink-0 overflow-y-clip overflow-x-visible bg-primary-900 opacity-0;

    &::before {
      @apply absolute left-1/2 top-[2.5rem] size-2 -translate-x-1/2 rounded-full bg-primary-800 opacity-[inherit] transition-opacity delay-[250ms] duration-500 content-[''];
    }
  }

  > :last-child {
    @apply pt-8 opacity-0;
  }

  span:first-of-type {
    @apply text-sm text-primary-500;
  }

  h3 {
    @apply mt-2 font-title text-lg font-semibold leading-snug;
  }
}
</style>
