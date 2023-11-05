<template>
  <section id="projects">
    <h2>Projects</h2>
    <div class="projects-items relative mt-4 w-full overflow-x-hidden px-4">
      <div class="controls absolute left-0 flex h-full w-full items-center justify-between">
        <GoogleIcon class="previous" @click="previousProject()">chevron_left</GoogleIcon>
        <GoogleIcon class="next" @click="nextProject()">chevron_right</GoogleIcon>
      </div>
      <div class="content flex translate-x-0 gap-4 transition duration-500">
        <div class="projects-item">
          <div class="projects-item-header">
            <ImageAsset
              class="projects-item-image"
              fileName="images/projects/eazynick.webp"
              alt="EazyNick"
              :width="projectImageSize"
              :height="projectImageSize"
            />
            <h3 class="projects-item-title">EazyNick</h3>
            <a class="projects-item-link" href="https://github.com/jgeramb/EazyNick" target="_blank">
              <GoogleIcon>link</GoogleIcon>
            </a>
          </div>
          <p class="projects-item-description">
            A Minecraft Spigot disguise plugin for 1.7.10 to 1.19.4 that changes your name in the chat and tablist and above your head. In
            addition to that it changes your skin and on some versions also the UUID.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import ImageAsset from "@/components/ImageAsset.vue";
import GoogleIcon from "@/components/GoogleIcon.vue";
import gsap from "gsap";
import { nextTick, onMounted } from "vue";

const projectImageSize = 36;
let currentProject = 0;

const previousProject = () => {
  if (currentProject > 0) {
    currentProject--;

    updateProject();
  }
};
const nextProject = () => {
  if (currentProject < document.querySelectorAll(".projects-item").length - (window.innerWidth >= 640 ? 3 : 1)) {
    currentProject++;

    updateProject();
  }
};
const updateProject = () => {
  // controls
  document.querySelector(".projects-items .controls .previous").style.opacity = currentProject > 0 ? 1 : 0;
  document.querySelector(".projects-items .controls .next").style.opacity =
    currentProject < document.querySelectorAll(".projects-item").length - (window.innerWidth >= 640 ? 3 : 1) ? 1 : 0;

  // change project item
  const projectsItemContent = document.querySelector(".projects-items .content");
  const firstProjectsItem = document.querySelector(".projects-item");
  projectsItemContent.style.transform = "translateX(-" + currentProject * (firstProjectsItem.clientWidth + 16) + "px)";
};

onMounted(async () => {
  await nextTick();

  const projectsTimeLine = gsap.timeline({
    scrollTrigger: {
      trigger: "#projects",
      start: "top center"
    },
    defaults: {
      duration: 1,
      ease: "power2.out"
    }
  });
  gsap.utils.toArray(".projects-item").forEach((careerItem) => {
    projectsTimeLine.from(careerItem, { opacity: 0 }, "<25%");
  });

  updateProject();
});
</script>

<style lang="scss" scoped>
#projects {
  @apply flex-col;

  .projects-items {
    &::before,
    &::after {
      @apply absolute top-0 z-10 h-full w-6 from-primary-950;

      content: "";
    }

    &::before {
      @apply left-0 bg-gradient-to-r;
    }

    &::after {
      @apply right-0 bg-gradient-to-l;
    }

    .controls > span {
      @apply relative z-20 cursor-pointer rounded-full bg-primary-600 p-1.5 transition-opacity duration-500;
    }

    .content .projects-item {
      @apply mx-auto flex max-w-full flex-shrink-0 flex-col items-center gap-2 rounded-xl bg-primary-900 px-6 py-4 sm:max-w-[calc((100%-2rem)/3)];

      .projects-item-header {
        @apply flex items-center gap-2;

        .projects-item-image {
          @apply rounded-full;
        }

        .projects-item-title {
          @apply text-2xl;
        }

        .projects-item-link {
          @apply text-lg text-primary-300;
        }
      }

      .projects-item-description {
        @apply text-primary-400;
      }
    }
  }
}
</style>
