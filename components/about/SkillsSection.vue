<template>
  <section
    class="mx-auto flex flex-col items-center bg-black pb-4 pt-24 text-primary-50 *:w-full *:max-w-6xl *:px-8"
  >
    <h2 class="text-center">Skills</h2>
    <p class="mb-24 mt-4 text-center text-primary-400 max-lg:text-sm">
      Things that I use to built first-class web apps.
    </p>
    <ul ref="wrapper" class="grid-cols-1 flex-wrap justify-between gap-16 max-lg:grid sm:grid-cols-2 lg:flex">
      <li v-for="skill in skills" :key="skill.title" class="opacity-0">
        <img
          :src="`/images/skills/${skill.icon.name}.svg`"
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

<script setup>
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const { data: skills } = await useAsyncData("skills", () =>
  queryContent("skills").sort({ rating: -1 }).find()
);

const wrapper = ref();

useTransitionListener(() => {
  gsap.registerPlugin(ScrollTrigger);
  gsap.fromTo(
    wrapper.value.children,
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
        trigger: wrapper.value,
        start: "top 90%"
      }
    }
  );
});
</script>

<style lang="scss" scoped>
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
