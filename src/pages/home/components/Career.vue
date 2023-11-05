<template>
  <section id="career">
    <h2>Career</h2>
    <div class="career-items mx-auto mt-4 flex flex-col">
      <div class="career-item">
        <div class="career-item-details">
          <span class="career-item-time">
            2022
            <span class="material-symbols-rounded">horizontal_rule</span>
            present
          </span>
          <h3 class="career-item-title">duschdichtungsprofile.de</h3>
          <p class="career-item-description">Software engineer</p>
        </div>
      </div>
      <div class="career-item">
        <div class="career-item-details">
          <span class="career-item-time">2022</span>
          <h3 class="career-item-title">Digital Masters</h3>
          <p class="career-item-description">Internship</p>
        </div>
      </div>
      <div class="career-item">
        <div class="career-item-details">
          <span class="career-item-time">2021</span>
          <h3 class="career-item-title">CoreMedia</h3>
          <p class="career-item-description">Internship</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import gsap from "gsap";
import { nextTick, onMounted } from "vue";

onMounted(async () => {
  await nextTick();

  const careerTimeLine = gsap.timeline({
    scrollTrigger: {
      trigger: "#career",
      start: "top center"
    },
    defaults: {
      duration: 0.5,
      ease: "power2.out"
    }
  });
  gsap.utils.toArray(".career-item").forEach((careerItem) => {
    careerTimeLine.from(careerItem.querySelector(".career-item-details"), {
      opacity: 0,
      onStart: () => {
        careerItem.style.animationPlayState = "running";
      }
    });
  });
});
</script>

<style lang="scss" scoped>
#career {
  @apply flex-col;

  .career-items {
    .career-item {
      @apply relative flex pl-8;

      animation-play-state: paused;

      &::before {
        @apply absolute h-full max-h-0 animate-[grow-to-b_0.5s_linear] bg-primary-50;

        animation-fill-mode: forwards;
        animation-play-state: inherit;

        content: "";
        left: 4px;
        width: 2px;
      }

      &::after {
        @apply absolute left-0 top-0 animate-[fade-in_0.5s_linear] rounded-full bg-primary-50 opacity-0 sm:top-6;

        animation-fill-mode: forwards;
        animation-play-state: inherit;

        content: "";
        height: 10px;
        width: 10px;
      }

      .career-item-details {
        @apply flex flex-col py-4;

        .career-item-time {
          @apply absolute top-1.5 flex translate-y-[-50%] items-center font-title text-xs uppercase text-primary-300 sm:-left-5 sm:top-7 sm:translate-x-[-100%];
        }

        .career-item-title {
          @apply text-xl;
        }

        .career-item-description {
          @apply text-primary-400;
        }
      }
    }
  }
}
</style>
