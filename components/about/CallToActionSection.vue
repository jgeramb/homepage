<template>
  <section
    ref="wrapper"
    class="flex flex-col items-center gap-4 px-8 py-16 *:relative *:text-center *:opacity-0"
  >
    <h2>Got an idea?</h2>
    <p class="lg:text-lg">I got the code. Let's make it a real website!</p>
    <StyledButton primary class="mt-4 !px-8 lg:text-lg" @click="navigateTo('/contact')">
      Contact me
    </StyledButton>
  </section>
</template>

<script setup>
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const wrapper = ref();

function createScrollTrigger() {
  gsap.registerPlugin(ScrollTrigger);
  gsap.fromTo(
    wrapper.value.children,
    { opacity: 0, top: -10 },
    {
      opacity: 1,
      top: 0,
      duration: 0.5,
      ease: "power3.inOut",
      stagger: 0.1,
      scrollTrigger: {
        trigger: wrapper.value,
        start: "top 90%"
      }
    }
  );
}

defineExpose({ createScrollTrigger });
</script>
