<template>
  <main class="mx-auto mt-8 max-w-6xl px-8 lg:py-8">
    <Transition>
      <div
        v-if="pending || success"
        class="flex h-[calc(100dvh-9rem)] flex-col items-center justify-center gap-4 text-center lg:h-[calc(100dvh-14.3125rem)]"
      >
        <div
          v-if="pending"
          class="border-primary-200 size-12 animate-spin rounded-full border-4 border-b-transparent"
        ></div>
        <template v-else>
          <span class="h2">Thank you!</span>
          <p>I got your message and will respond as quickly as possible.</p>
          <StyledButton secondary class="mt-4" @click="resetForm">Send another</StyledButton>
        </template>
      </div>
      <div v-else class="flex flex-col gap-4">
        <Transition
          enter-active-class="transition-opacity duration-300 ease-in-out"
          leave-active-class="transition-opacity duration-300 ease-in-out"
          enter-from-class="opacity-0"
          leave-to-class="opacity-0"
        >
          <div
            v-if="error"
            class="bg-error text-primary-50 shadow-primary-950/25 rounded-md px-4 py-2 shadow-lg"
          >
            <span class="font-title text-xs leading-none font-semibold tracking-wide uppercase">Error</span>
            <p class="mt-1 text-sm leading-relaxed">{{ error }}</p>
          </div>
        </Transition>
        <h1 class="h1">Contact</h1>
        <p class="leading-relaxed! lg:text-lg">
          <span class="font-medium tracking-wide">Got a question? Want to work together?</span> I'm always
          looking for new opportunities to collaborate with others. Feel free to reach out to me using the
          form below or by using one of the buttons in the footer.
        </p>
        <form
          ref="formRef"
          class="mt-12 grid grid-cols-1 gap-8 md:grid-cols-[1fr_2fr]"
          @submit.prevent="sendMessage"
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
              class="max-h-96 min-h-47.5"
              :class="{ 'has-value': message?.length }"
            />
          </div>
          <StyledButton type="submit" primary class="md:mr-auto">Send message</StyledButton>
        </form>
      </div>
    </Transition>
  </main>
</template>

<script setup lang="ts">
import { useTransitionListener } from "#layers/base/app/composables/transition/listener";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const pending = shallowRef(false);
const success = shallowRef(false);
const error = shallowRef<any | null>(null);

const name = shallowRef<string | null>(null);
const email = shallowRef<string | null>(null);
const subject = shallowRef<string | null>(null);
const message = shallowRef<string | null>(null);

function resetForm() {
  success.value = false;
  error.value = null;

  name.value = email.value = subject.value = message.value = null;
}

async function sendMessage() {
  pending.value = true;

  try {
    await $fetch("/api/v1/contact-form", {
      method: "POST",
      body: {
        name: name.value,
        email: email.value,
        subject: subject.value,
        message: message.value
      },
      headers: { "Content-Type": "application/json" }
    });

    success.value = true;
  } catch (error: any) {
    error.value = error;
  }

  pending.value = false;
}

const formRef = useTemplateRef("formRef");

useTransitionListener(() => {
  if (!formRef.value) return;

  const submitButton = formRef.value.querySelector('button[type="submit"]') as HTMLButtonElement;
  submitButton.style.transitionProperty = "none";

  gsap.registerPlugin(ScrollTrigger);
  gsap.from([...formRef.value.getElementsByClassName("input-container"), submitButton], {
    y: 10,
    opacity: 0,
    duration: 0.5,
    stagger: 0.05,
    ease: "power3.inOut",
    onComplete() {
      submitButton.style.removeProperty("transition-property");
      submitButton.style.removeProperty("transform");
    }
  });
});

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
            "item": "${useRuntimeConfig().public.baseUrl}/contact"
          }
        ]
      }`
    }
  ]
});
</script>

<style scoped>
@reference "../assets/css/tailwind.css";

.input-container {
  @apply relative;

  > label {
    @apply bg-primary-100 text-primary-500 pointer-events-none absolute top-3.5 left-3 px-1 text-sm leading-none transition-[top,transform] duration-300 ease-out;

    &:has(+ input:focus),
    &:has(+ textarea:focus),
    &:has(+ input.has-value),
    &:has(+ textarea.has-value) {
      @apply top-0 -translate-y-1/2;
    }
  }

  > input,
  > textarea {
    @apply border-primary-300 focus:outline-accent w-full rounded-md border bg-transparent px-4 py-2 text-base focus:outline-1;
  }
}
</style>
