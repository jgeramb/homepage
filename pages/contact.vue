<template>
  <div class="mx-auto mt-8 max-w-6xl px-8 lg:py-8">
    <Transition>
      <div
        v-if="pending || success"
        class="flex h-[calc(var(--vh,1vh)*100-9rem)] flex-col items-center justify-center gap-4 text-center lg:h-[calc(var(--vh,1vh)*100-14.3125rem)]"
      >
        <div
          v-if="pending"
          class="size-12 animate-spin rounded-full border-4 border-primary-200 border-b-transparent"
        ></div>
        <template v-else>
          <h2>Thank you!</h2>
          <p>I got your message and will respond as quickly as possible.</p>
          <StyledButton secondary class="mt-4" @click="resetForm">Send another</StyledButton>
        </template>
      </div>
      <div v-else class="flex flex-col gap-4">
        <Transition>
          <div
            v-if="error"
            class="rounded-md bg-error px-4 py-2 text-primary-50 shadow-lg shadow-primary-950/25"
          >
            <span class="font-title text-xs font-semibold uppercase leading-none tracking-wide">Error</span>
            <p class="mt-1 text-sm leading-relaxed">{{ error }}</p>
          </div>
        </Transition>
        <h1>Contact</h1>
        <p class="!leading-relaxed lg:text-lg">
          <span class="font-medium tracking-wide">Got a question? Want to work together?</span> I'm always
          looking for new opportunities to collaborate with others. Feel free to reach out to me using the
          form below or by using one of the buttons in the footer.
        </p>
        <form
          ref="form"
          @submit.prevent="sendMessage"
          class="mt-12 grid grid-cols-1 gap-8 md:grid-cols-[1fr_2fr]"
        >
          <div class="flex flex-col gap-8">
            <div class="input-container">
              <label>Name</label>
              <input
                v-model="name"
                type="text"
                autocomplete="name"
                required
                :class="{ 'has-value': name?.length }"
              />
            </div>
            <div class="input-container">
              <label>E-Mail</label>
              <input
                v-model="email"
                type="email"
                autocomplete="email"
                required
                :class="{ 'has-value': email?.length }"
              />
            </div>
            <div class="input-container">
              <label>Subject</label>
              <input v-model="subject" type="text" required :class="{ 'has-value': subject?.length }" />
            </div>
          </div>
          <div class="input-container">
            <label>Message</label>
            <textarea
              v-model="message"
              minlength="25"
              required
              class="max-h-96 min-h-[11.875rem]"
              :class="{ 'has-value': message?.length }"
            />
          </div>
          <StyledButton type="submit" primary class="md:mr-auto">Send message</StyledButton>
        </form>
      </div>
    </Transition>
  </div>
</template>

<script setup>
useHeadSEO(true, "Contact • Justus Geramb", "Contact", "Get in touch with me.", "/contact");
useHead({
  script: [
    {
      type: "application/ld+json",
      innerHTML: `{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Contact",
            "item": "${useRuntimeConfig().public.baseURL}/contact"
          }
        ]
      }`
    }
  ]
});

const pending = ref(false);
const success = ref(false);
const error = ref(null);

const name = ref(null);
const email = ref(null);
const subject = ref(null);
const message = ref(null);

function resetForm() {
  success.value = false;
  error.value = null;

  name.value = email.value = subject.value = message.value = null;
}

async function sendMessage() {
  pending.value = true;

  try {
    await $fetch("/api/v1/messages", {
      method: "POST",
      body: { name: name.value, email: email.value, subject: subject.value, message: message.value },
      headers: { "Content-Type": "application/json" }
    });

    success.value = true;
  } catch (error) {
    error.value = error;
  }

  pending.value = false;
}

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const form = ref();

useTransitionListener(() => {
  const submitButton = form.value.querySelector('button[type="submit"]');
  submitButton.style.transitionProperty = "none";

  gsap.registerPlugin(ScrollTrigger);
  gsap.from([...form.value.getElementsByClassName("input-container"), submitButton], {
    y: 10,
    opacity: 0,
    duration: 0.5,
    stagger: 0.25,
    ease: "power3.inOut",
    scrollTrigger: {
      trigger: form.value,
      start: "top 90%"
    },
    onComplete() {
      submitButton.style.removeProperty("transition-property");
      submitButton.style.removeProperty("transform");
    }
  });
});
</script>

<style lang="scss" scoped>
.v-enter-active,
.v-leave-active {
  @apply transition-opacity duration-300 ease-in-out;
}

.v-enter-active {
  @apply delay-300;
}

.v-enter-from,
.v-leave-to {
  @apply opacity-0;
}

.input-container {
  @apply relative;

  > label {
    @apply pointer-events-none absolute left-3 top-3.5 bg-primary-100 px-1 text-sm leading-none text-primary-500 transition-[top,transform] duration-300 ease-out;

    &:has(+ input:focus),
    &:has(+ textarea:focus),
    &:has(+ input.has-value),
    &:has(+ textarea.has-value) {
      @apply top-0 -translate-y-1/2;
    }
  }

  > input,
  > textarea {
    @apply w-full rounded-md border border-primary-300 bg-transparent px-4 py-2 text-base focus:outline-1 focus:outline-accent;
  }
}
</style>
