<template>
  <section
    class="text-primary-50 mx-auto flex flex-col items-center bg-black pt-24 pb-4 *:w-full *:max-w-6xl *:px-8"
  >
    <h2 class="h2 text-center">Skills</h2>
    <p class="text-primary-400 mt-4 mb-24 text-center max-lg:text-sm">
      Things that I use to built first-class web apps.
    </p>
    <ul
      ref="wrapperRef"
      class="grid-cols-1 flex-wrap justify-between gap-16 max-lg:grid sm:grid-cols-2 lg:flex"
    >
      <li v-for="skill in skills" :key="skill.title" class="opacity-0">
        <img
          :src="`/assets/images/skills/${skill.icon.name}.svg`"
          :width="skill.icon.width"
          :height="skill.icon.height"
          alt="Skill Icon"
        />
        <span>{{ skill.title }}</span>
        <AboutRating :rating="skill.rating" />
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { useTransitionListener } from "#layers/base/app/composables/transition/listener";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const { data: skills } = await useAsyncData("skills", () =>
  queryCollection("skills").order("rating", "DESC").all()
);

const wrapperRef = useTemplateRef("wrapperRef");

useTransitionListener(() => {
  gsap.registerPlugin(ScrollTrigger);
  gsap.fromTo(
    wrapperRef.value!.children,
    {
      opacity: 0,
      y: -10
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power3.inOut",
      stagger: 0.1,
      scrollTrigger: {
        trigger: wrapperRef.value,
        start: "top 90%"
      }
    }
  );
});
</script>

<style scoped>
@reference "../../assets/css/tailwind.css";

ul li {
  @apply flex flex-col items-center gap-4 text-xl;

  img {
    @apply my-auto w-16;
  }

  span {
    @apply mt-2 text-xl;
  }
}
</style>
