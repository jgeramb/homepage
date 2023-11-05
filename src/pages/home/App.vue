<template>
  <div class="min-h-[calc(var(--vh,1vh)*100-40px)] w-full justify-center">
    <PopUp v-if="isMessageSentSet" @close="dismissMessage">
      <div class="message-container">
        <span class="message-icon material-symbols-rounded text-accent">check</span>
        <p>Your message was sent successfully!</p>
      </div>
    </PopUp>

    <PopUp v-if="isSendErrorSet" @close="dismissMessage">
      <div class="message-container">
        <span class="message-icon material-symbols-rounded text-error">error</span>
        <p>
          Your message could not be delivered:<br />
          <span class="text-sm text-primary-400">{{ sendErrorText }}</span>
        </p>
      </div>
    </PopUp>

    <Hero />
    <SkillsTools />
    <Projects />
    <Career />
    <ContactForm />
  </div>
  <CustomFooter />
</template>

<script setup>
import CustomFooter from "@/components/CustomFooter.vue";
import PopUp from "@/components/PopUp.vue";
import Hero from "./components/Hero.vue";
import SkillsTools from "./components/SkillsTools.vue";
import Projects from "./components/Projects.vue";
import Career from "./components/Career.vue";
import ContactForm from "./components/ContactForm.vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { onMounted } from "vue";

gsap.registerPlugin(ScrollTrigger);

const updateViewportVariables = () => {
  let vh = document.documentElement.clientHeight * 0.01,
    vw = window.innerWidth * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
  document.documentElement.style.setProperty("--vw", `${vw}px`);
};

onMounted(() => {
  window.addEventListener("resize", updateViewportVariables);
  updateViewportVariables();
});

const isMessageSentSet = window.location.search.startsWith("?message_sent"),
  isSendErrorSet = window.location.search.startsWith("?send_error="),
  sendErrorText = isSendErrorSet ? encodeURIComponent(window.location.search.split("=")[1].replace(/\+/g, " ")) : "";
const dismissMessage = () => window.location.replace("/");
</script>

<style lang="scss">
/* Scrollbar */

::-webkit-scrollbar {
  height: 7px;
  width: 7px;
}

::-webkit-scrollbar-track {
  background-color: #040406;
}

::-webkit-scrollbar-thumb {
  background-color: #1a212a;
  border-radius: 5.625px;
}

body {
  scrollbar-color: transparent;
  scrollbar-width: thin;
}

section {
  @apply mx-4 my-16 flex max-w-3xl sm:mx-auto;

  h2 {
    @apply text-center;
  }
}

/* PopUps */

.message-container {
  @apply mx-6 flex w-full max-w-lg flex-col items-center gap-6 rounded-xl bg-primary-900 p-8 text-center;

  .message-icon {
    @apply flex h-[50px] w-[50px] items-center justify-center rounded-full bg-primary-950 p-1.5 text-4xl;
  }

  > p {
    @apply break-all text-xl;
  }
}
</style>
