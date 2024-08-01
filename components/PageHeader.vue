<template>
  <header
    class="sticky top-0 z-40 grid grid-cols-[auto_1fr] items-center gap-y-8 overflow-hidden border-b border-b-primary-200 bg-primary-100/85 p-8 backdrop-blur-md transition-[max-height] duration-500 will-change-[max-height] max-md:h-dvh max-md:max-h-[5rem] max-md:grid-rows-[auto_1fr] md:grid-cols-[1fr_3fr_1fr] md:gap-x-8"
    :class="{ '!max-h-[calc(var(--vh,1vh)*100)]': menuOpen }"
  >
    <NuxtLink to="/" aria-label="Return to home" class="flex gap-2">
      <NuxtImg
        src="brand/logo.svg"
        alt="Logo"
        width="1024"
        height="1024"
        loading="eager"
        class="w-5 md:w-7"
      />
      <p class="font-title text-sm uppercase leading-tight tracking-wider max-md:hidden">
        Justus<br />
        Geramb
      </p>
    </NuxtLink>
    <a id="menu-icon" role="button" aria-label="Toggle menu" class="md:hidden" @click="toggleMenu">
      <div class="line" :class="{ 'translate-y-[0.3125rem] -rotate-45': menuOpen }"></div>
      <div class="line" :class="{ '-translate-y-[0.3125rem] rotate-45': menuOpen }"></div>
    </a>
    <nav ref="navigation" class="max-md:col-span-full max-md:h-full md:justify-self-center">
      <div
        ref="cursor"
        class="absolute -z-10 rounded-md bg-primary-200 opacity-0 will-change-[opacity,left,top,width,height] max-md:hidden"
      ></div>
      <ul class="flex gap-4 max-md:h-full max-md:flex-col max-md:justify-end md:items-center">
        <li><NuxtLink to="/about">About</NuxtLink></li>
        <li><NuxtLink to="/references">References</NuxtLink></li>
      </ul>
    </nav>
    <StyledButton
      id="contact-button"
      secondary
      class="max-md:col-span-full max-md:w-full md:justify-self-end"
      @click="navigateTo('/contact')"
    >
      Get in touch
    </StyledButton>
  </header>
</template>

<script setup>
import { gsap } from "gsap";

const cursor = ref();
let cursorTween;

function moveCursor(listItem) {
  const wasHidden = gsap.getProperty(cursor.value, "opacity") < 0.5;

  cursorTween?.kill();

  if (!listItem || (listItem && wasHidden)) {
    cursorTween = gsap.to(cursor.value, {
      opacity: listItem && wasHidden ? 1 : 0,
      duration: 0.5,
      ease: "power3.inOut"
    });

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
  else cursorTween = gsap.to(cursor.value, { ...updatedProperties, duration: 0.25, ease: "expo.inOut" });
}

const navigation = ref();
const activeLink = ref();

function updateActiveLink() {
  const links = Array.from(navigation.value.getElementsByTagName("a"));

  activeLink.value = links.find((link) => link.classList.contains("router-link-active"));

  moveCursor(activeLink.value);
}

useTransitionListener(() => {
  for (const link of navigation.value.getElementsByTagName("li")) {
    link.addEventListener("mouseenter", () => moveCursor(link));
    link.addEventListener("mouseleave", () => moveCursor(activeLink.value));
  }

  updateActiveLink();
});

const menuOpen = ref(false);
const ITEM_FROM = { opacity: 0, y: -12 };
const ITEM_TO = { opacity: 1, y: 0 };
let menuTween, scrollY;

function closeMenu(resetScroll = false) {
  menuOpen.value = false;

  document.documentElement.style.removeProperty("overflow");

  if (!resetScroll) window.scrollTo({ top: scrollY, behavior: "smooth" });
}

function toggleMenu(resetScroll = false) {
  const shouldExpand = !menuOpen.value;
  const contactButton = document.getElementById("contact-button");
  const items = [...gsap.utils.toArray(navigation.value.getElementsByTagName("li")), contactButton];

  contactButton.style.transitionProperty = "none";

  menuTween?.kill();
  menuTween = gsap.fromTo(shouldExpand ? items : items.reverse(), shouldExpand ? ITEM_FROM : ITEM_TO, {
    ...(shouldExpand ? ITEM_TO : ITEM_FROM),
    stagger: 0.1,
    duration: 0.5,
    delay: shouldExpand ? 0.375 : 0,
    ease: shouldExpand ? "power3.out" : "power3.in",
    onComplete: () => {
      if (!shouldExpand) closeMenu(resetScroll);

      contactButton.style.removeProperty("transition-property");
      contactButton.style.removeProperty("transform");
    }
  });

  if (shouldExpand) {
    menuOpen.value = true;

    scrollY = window.scrollY;

    window.scrollTo({ top: 0, behavior: "smooth" });
    document.documentElement.style.overflow = "hidden";
  }
}

watch(
  () => useRoute().path,
  () => {
    updateActiveLink();

    if (menuOpen.value) toggleMenu(true);
  }
);

if (import.meta.client) {
  useEventListener(
    "resize",
    () => {
      updateActiveLink();

      if (menuOpen.value) closeMenu();
    },
    true
  );
}
</script>

<style scoped lang="scss">
#menu-icon {
  @apply flex h-[1.25rem] w-7 flex-col items-stretch justify-around justify-self-end md:hidden;

  .line {
    @apply h-[0.21875rem] bg-primary-950 transition-transform duration-500 will-change-transform;
  }
}

li > a {
  @apply block py-2 font-medium uppercase tracking-widest md:px-4 md:text-sm;
}
</style>
