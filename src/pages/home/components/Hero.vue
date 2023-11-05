<template>
  <div class="relative flex h-screen w-full flex-col items-center justify-center">
    <div class="hero-wallpaper"></div>
    <div class="flex flex-col items-center">
      <ImageAsset class="rounded-full object-cover" fileName="images/portrait.webp" alt="Justus G." :width="142" :height="142" eager />
      <h1 class="mt-5 text-5xl">Justus G.</h1>
      <p class="text-md mt-2.5 text-center font-title uppercase tracking-widest text-primary-300">Fix the cause,<br />not the symptom</p>
      <GoogleIcon
        id="down-arrow"
        class="mt-5 flex cursor-pointer items-center rounded-full bg-primary-700 p-1.5 text-2xl transition-colors duration-500 hover:bg-primary-800"
        @click="scrollDown()"
      >
        expand_more
      </GoogleIcon>
    </div>
  </div>
</template>

<script setup>
import ImageAsset from "@/components/ImageAsset.vue";
import GoogleIcon from "@/components/GoogleIcon.vue";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { nextTick, onMounted } from "vue";

defineEmits(["close"]);

gsap.registerPlugin(ScrollToPlugin);

const scrollDown = () => {
  gsap.to(window, {
    duration: 1.5,
    scrollTo: { y: "#skills-tools", offsetY: 50 },
    onComplete: () => window.history.replaceState(null, document.title, "/#skills-tools")
  });
};

onMounted(async () => {
  await nextTick();

  gsap.to("#down-arrow", {
    yPercent: 12.5,
    duration: 0.5,
    ease: "power2.ease",
    repeat: -1,
    yoyo: true
  });
});
</script>

<style lang="scss" scoped>
.hero-wallpaper {
  @apply absolute top-0 -z-20 h-full w-full bg-cover bg-center;

  background-image: url("@/assets/images/binnenalster.webp");

  &::after {
    @apply relative -z-10 block h-full w-full bg-gradient-to-t from-primary-950 via-primary-900 opacity-[0.825] content-[''];
  }
}
</style>
