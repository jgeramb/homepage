<template>
  <header
    class="border-b-primary-200 bg-primary-100/85 sticky top-0 z-40 grid grid-cols-[auto_1fr] items-center gap-y-8 overflow-hidden border-b p-8 backdrop-blur-md transition-[max-height] duration-500 will-change-[max-height] max-md:h-dvh max-md:max-h-20 max-md:grid-rows-[auto_1fr] md:grid-cols-[1fr_3fr_1fr] md:gap-x-8"
    :class="{ 'max-h-dvh!': menuOpen }"
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
      <p class="font-title text-sm leading-tight tracking-wider uppercase max-md:hidden">
        Justus<br />
        Geramb
      </p>
    </NuxtLink>
    <a id="menu-icon" role="button" aria-label="Toggle menu" class="md:hidden" @click="toggleMenu">
      <div class="line" :class="{ 'translate-y-1.25 -rotate-45': menuOpen }"></div>
      <div class="line" :class="{ '-translate-y-1.25 rotate-45': menuOpen }"></div>
    </a>
    <nav ref="navigationRef" class="max-md:col-span-full max-md:h-full md:justify-self-center">
      <div
        ref="cursorRef"
        class="bg-primary-200 absolute -z-10 rounded-md opacity-0 will-change-[opacity,left,top,width,height] max-md:hidden"
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

<script setup lang="ts">
import { useTransitionListener } from "#layers/base/app/composables/transition/listener";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const cursorRef = useTemplateRef("cursorRef");
let cursorTween: gsap.core.Tween | null = null;

function moveCursor(listItem: HTMLLIElement) {
  const wasHidden = (gsap.getProperty(cursorRef.value, "opacity") as number) < 0.5;

  cursorTween?.kill();

  if (!listItem || (listItem && wasHidden)) {
    cursorTween = gsap.to(cursorRef.value, {
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

  if (wasHidden) gsap.set(cursorRef.value, { ...updatedProperties });
  else cursorTween = gsap.to(cursorRef.value, { ...updatedProperties, duration: 0.25, ease: "expo.inOut" });
}

const navigationRef = useTemplateRef("navigationRef");
const activeLinkRef = shallowRef();

function updateActiveLink() {
  if (!navigationRef.value) return;

  const links: HTMLAnchorElement[] = Array.from(navigationRef.value.getElementsByTagName("a"));

  activeLinkRef.value = links.find((link) => link.classList.contains("router-link-active"));

  moveCursor(activeLinkRef.value);

  if (menuOpen.value) closeMenu();
}

useTransitionListener(() => {
  for (const link of navigationRef.value!.getElementsByTagName("li")) {
    link.addEventListener("mouseenter", () => moveCursor(link));
    link.addEventListener("mouseleave", () => moveCursor(activeLinkRef.value));
  }

  updateActiveLink();
});

const menuOpen = shallowRef(false);
let menuTween: gsap.core.Tween | null;
let scrollY: number;

function closeMenu(resetScroll = false) {
  if (!menuOpen.value) return;

  menuOpen.value = false;

  document.documentElement.style.removeProperty("overflow");

  if (!resetScroll) window.scrollTo({ top: scrollY, behavior: "smooth" });
  else setTimeout(() => ScrollTrigger.refresh(), 500);
}

function toggleMenu(resetScroll = false) {
  const shouldExpand = !menuOpen.value;
  const contactButton = document.getElementById("contact-button")!;
  const items = [...gsap.utils.toArray(navigationRef.value!.getElementsByTagName("li")), contactButton];

  contactButton.style.transitionProperty = "none";

  const ITEM_FROM = { opacity: 0, y: -12 };
  const ITEM_TO = { opacity: 1, y: 0 };

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

watch(() => useRoute().path, updateActiveLink);
useEventListener("resize", updateActiveLink, true);
</script>

<style scoped>
@reference "../../assets/css/tailwind.css";

#menu-icon {
  @apply flex h-5 w-7 flex-col items-stretch justify-around justify-self-end md:hidden;

  .line {
    @apply bg-primary-950 h-[0.21875rem] transition-transform duration-500 will-change-transform;
  }
}

li > a {
  @apply block py-2 font-medium tracking-widest uppercase md:px-4 md:text-sm;
}
</style>
