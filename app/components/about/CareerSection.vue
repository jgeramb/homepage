<template>
  <section class="mx-auto max-w-6xl px-8 pt-24 pb-16">
    <h2 class="h2">Career</h2>
    <ul ref="timelineRef" class="mt-16">
      <li v-for="(item, index) in timelineItems" :key="index">
        <div></div>
        <div>
          <span class="year">
            {{
              item.start_year + ((item.start_year !== item.end_year && ` - ${item.end_year || "now"}`) || "")
            }}
          </span>
          <span class="title">{{ item.title }}</span>
          <p>{{ item.description }}</p>
        </div>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { useTransitionListener } from "#layers/base/app/composables/transition/listener";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const timelineRef = useTemplateRef("timelineRef");

useTransitionListener(() => {
  const timeline = timelineRef.value!;
  const items = timeline.children;

  gsap.registerPlugin(ScrollTrigger);

  let isFadingIn = false;
  let queue: Function[] = [];

  Array.from(items).forEach((item) =>
    ScrollTrigger.create({
      trigger: item,
      start: "top 90%",
      onEnter() {
        function animate() {
          gsap.to(item.firstElementChild, {
            maxHeight: item.scrollHeight,
            duration: 0.5,
            ease: "linear",
            onStart: () => {
              (item.firstElementChild as HTMLDivElement).style.opacity = "1";
            },
            onComplete() {
              if (queue.length > 0) queue.shift()!();
              else isFadingIn = false;
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

const { data: timelineItems } = await useAsyncData("career-items", () =>
  queryCollection("career").order("start_year", "DESC").all()
);
</script>

<style scoped>
@reference "../../assets/css/tailwind.css";

li {
  @apply relative flex gap-16 [&:last-child_>:first-child]:h-12;

  &:first-child {
    @apply **:last:pt-0;

    > :first-child {
      @apply mt-2 before:top-0;
    }
  }

  > :first-child {
    @apply bg-primary-900 relative max-h-0 w-0.5 shrink-0 overflow-x-visible overflow-y-clip opacity-0;

    &::before {
      @apply bg-primary-800 absolute top-10 left-1/2 size-2 -translate-x-1/2 rounded-full opacity-[inherit] transition-opacity delay-250 duration-500 content-[''];
    }
  }

  > :last-child {
    @apply pt-8 opacity-0;

    .year {
      @apply text-primary-500 block text-sm;
    }

    .title {
      @apply font-title mt-2 text-lg leading-snug font-semibold;
    }
  }
}
</style>
