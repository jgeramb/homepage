<template>
  <header
    class="sticky top-0 grid grid-cols-[auto_1fr] items-center gap-8 overflow-hidden bg-primary-100 px-6 py-6 shadow-[2px_2px_2px_rgba(9_9_11/0.1)] transition-[max-height] duration-500 will-change-[max-height] max-md:h-dvh max-md:max-h-[4.5rem] max-md:grid-rows-[auto_1fr] md:grid-cols-[1fr_3fr_1fr]"
    :class="{ '!max-h-dvh': menuOpen }"
  >
    <NuxtLink to="/" class="flex gap-2">
      <NuxtImg src="brand/logo.svg" width="620" height="620" loading="eager" class="w-6 md:w-7" />
      <p class="font-title text-sm uppercase leading-[1.125rem] tracking-wider max-md:hidden">
        Justus<br />
        Geramb
      </p>
    </NuxtLink>
    <a id="menu-icon" role="button" class="md:hidden" @click="toggleMenu">
      <div class="line" :class="{ 'translate-y-[0.5625rem] -rotate-45': menuOpen }"></div>
      <div
        class="line transition-opacity duration-500 will-change-[opacity]"
        :class="{ 'opacity-0': menuOpen }"
      ></div>
      <div class="line" :class="{ '-translate-y-[0.5625rem] rotate-45': menuOpen }"></div>
    </a>
    <nav ref="navigation" class="h-full max-md:col-span-full md:justify-self-center">
      <div
        ref="cursor"
        class="absolute -z-10 rounded-md bg-primary-200 opacity-0 will-change-[opacity,left,top,width,height] max-md:hidden"
      ></div>
      <ul class="flex gap-4 max-md:h-full max-md:flex-col max-md:justify-end md:items-center">
        <li><NuxtLink to="/about">About</NuxtLink></li>
        <li><NuxtLink to="/references">References</NuxtLink></li>
      </ul>
    </nav>
    <a ref="contactButton" href="whatsapp://+491758842377" class="max-md:col-span-full md:justify-self-end">
      <StyledButton class="max-md:w-full">Get in touch</StyledButton>
    </a>
  </header>
</template>

<script setup>
import { gsap } from "gsap";

const cursor = ref();

function moveCursor(listItem) {
  const wasHidden = gsap.getProperty(cursor.value, "opacity") === 0;

  gsap.getTweensOf(cursor.value).forEach((tween) => tween.kill());

  if (!listItem || (listItem && wasHidden)) {
    gsap.to(cursor.value, { opacity: wasHidden ? 1 : 0, duration: 0.5, ease: "power3.inOut" });

    if (!listItem) return;
  }

  const itemRect = listItem.getBoundingClientRect();
  const updatedProperties = {
    left: itemRect.x,
    top: itemRect.y,
    width: itemRect.width,
    height: itemRect.height
  };

  if (wasHidden) gsap.set(cursor.value, { ...updatedProperties });
  else gsap.to(cursor.value, { ...updatedProperties, duration: 0.25, ease: "expo.inOut" });
}

const navigation = ref();
const activeLink = ref();

function updateActiveLink() {
  const links = Array.from(navigation.value.getElementsByTagName("a"));

  activeLink.value = links.find((link) => link.classList.contains("router-link-active"));

  if (activeLink.value) moveCursor(activeLink.value);
}

useTransitionListener(() => {
  for (const link of navigation.value.getElementsByTagName("li")) {
    link.addEventListener("mouseenter", () => moveCursor(link));
    link.addEventListener("mouseleave", () => moveCursor(activeLink.value));
  }

  updateActiveLink();
});

const menuOpen = ref(false);
const contactButton = ref();
const ITEM_FROM = { opacity: 0, y: -12 };
const ITEM_TO = { opacity: 1, y: 0 };

function toggleMenu() {
  const shouldExpand = !menuOpen.value;
  const items = [...gsap.utils.toArray(navigation.value.getElementsByTagName("li")), contactButton.value];

  gsap.fromTo(shouldExpand ? items : items.reverse(), shouldExpand ? ITEM_FROM : ITEM_TO, {
    ...(shouldExpand ? ITEM_TO : ITEM_FROM),
    stagger: 0.1,
    duration: 0.5,
    delay: shouldExpand ? 0.375 : 0,
    ease: shouldExpand ? "power3.out" : "power3.in",
    onComplete: () => (menuOpen.value = shouldExpand)
  });

  if (shouldExpand) menuOpen.value = true;
}

watch(
  () => useRoute().path,
  () => {
    updateActiveLink();

    if (menuOpen.value) toggleMenu();
  }
);
</script>

<style scoped lang="scss">
#menu-icon {
  @apply flex h-[1.375rem] w-7 flex-col items-stretch justify-between justify-self-end md:hidden;

  .line {
    @apply h-1 rounded-full bg-primary-950 odd:transition-transform odd:duration-500 odd:will-change-transform;
  }
}

li > a {
  @apply block py-2 font-medium uppercase tracking-widest md:px-4 md:text-sm;
}
</style>
