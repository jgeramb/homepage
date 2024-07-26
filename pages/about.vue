<template>
  <div class="*:w-full">
    <HeroSection class="flex items-center justify-center">
      <ImageAsset
        src="hanseforum.jpeg"
        alt="Hanseforum"
        height="768"
        sizes="320px sm:640px md:768px lg:1024px xl:1280px 2xl:1536px"
        fit="cover"
        :modifiers="{ position: 'right bottom' }"
        loading="eager"
        class="h-[calc(var(--vh,1vh)*100-5rem)] w-full object-cover brightness-50 md:h-[calc(var(--vh,1vh)*100-6.3125rem)]"
      />
      <div class="absolute px-8 text-center uppercase tracking-widest text-primary-50 *:drop-shadow-md">
        <h1 class="font-title text-4xl font-semibold !leading-snug lg:text-6xl">My journey</h1>
        <p class="text-xs lg:text-lg">as a software developer</p>
      </div>
    </HeroSection>
    <section class="mx-auto max-w-6xl px-8 py-24">
      <blockquote>
        <p class="text-[min(5.5vw,3.25rem)] !leading-relaxed *:opacity-50">
          <span>&quot;</span>
          Fix the cause, not the symptom, to achieve a long-term solution.
          <span>&quot;</span>
        </p>
      </blockquote>
      <p class="mt-4 font-title tracking-widest md:text-lg">&horbar; that's my motto</p>
    </section>
    <section
      id="skills"
      class="mx-auto flex flex-col items-center bg-black pb-4 pt-24 text-primary-50 *:w-full *:max-w-6xl *:px-8"
    >
      <h2 class="text-center">Skills</h2>
      <p class="mt-4 text-center text-primary-400 max-lg:text-sm">
        Things that I use to built first-class web apps.
      </p>
      <ul class="mt-24 grid-cols-1 flex-wrap justify-between gap-16 max-lg:grid sm:grid-cols-2 lg:flex">
        <li>
          <svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M168 200H279C282.542 200 285.932 198.756 289 197C292.068 195.244 295.23 193.041 297 190C298.77 186.959 300.002 183.51 300 179.999C299.998 176.488 298.773 173.04 297 170.001L222 41C220.23 37.96 218.067 35.7552 215 34C211.933 32.2448 207.542 31 204 31C200.458 31 197.067 32.2448 194 34C190.933 35.7552 188.77 37.96 187 41L168 74L130 9.99764C128.228 6.95784 126.068 3.75491 123 2C119.932 0.245087 116.542 0 113 0C109.458 0 106.068 0.245087 103 2C99.9323 3.75491 96.7717 6.95784 95 9.99764L2 170.001C0.226979 173.04 0.00154312 176.488 1.90993e-06 179.999C-0.0015393 183.51 0.229648 186.959 2 190C3.77035 193.04 6.93245 195.244 10 197C13.0675 198.756 16.4578 200 20 200H90C117.737 200 137.925 187.558 152 164L186 105L204 74L259 168H186L168 200ZM89 168H40L113 42L150 105L125.491 147.725C116.144 163.01 105.488 168 89 168Z"
            />
          </svg>
          <span>Nuxt.js / Vue.js</span>
          <Rating rating="5" />
        </li>
        <li>
          <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M 257.5,0.5 C 258.822,0.330034 259.989,0.663368 261,1.5C 298.193,46.8936 333.193,93.8936 366,142.5C 390.289,179.069 410.955,217.735 428,258.5C 455.221,331.104 441.054,394.271 385.5,448C 336.892,489.082 280.892,505.082 217.5,496C 141.727,480.551 90.2265,436.718 63,364.5C 55.9081,340.989 53.5748,316.989 56,292.5C 60.0384,250.347 70.0384,209.68 86,170.5C 92.6509,154.514 101.318,139.848 112,126.5C 120.715,136.88 129.048,147.547 137,158.5C 140.682,162.349 144.515,166.016 148.5,169.5C 178.917,109.136 215.251,52.8028 257.5,0.5 Z"
            />
            <path
              d="M 250.5,81.5 C 287.193,124.06 320.36,169.393 350,217.5C 359.293,233.418 366.959,250.085 373,267.5C 385.584,317.008 372.084,357.842 332.5,390C 294.216,416.939 252.216,424.939 206.5,414C 157.201,398.702 128.701,365.535 121,314.5C 119.131,298.409 120.798,282.742 126,267.5C 133.418,248.663 142.418,230.663 153,213.5C 163,198.833 173,184.167 183,169.5C 205.716,140.29 228.216,110.957 250.5,81.5 Z"
            />
          </svg>
          <span>Hono.js</span>
          <Rating rating="4.5" />
        </li>
        <li>
          <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M126.67 98.44c-4.56 1.16-7.38.05-9.91-3.75-5.68-8.51-11.95-16.63-18-24.9-.78-1.07-1.59-2.12-2.6-3.45C89 76 81.85 85.2 75.14 94.77c-2.4 3.42-4.92 4.91-9.4 3.7l26.92-36.13L67.6 29.71c4.31-.84 7.29-.41 9.93 3.45 5.83 8.52 12.26 16.63 18.67 25.21 6.45-8.55 12.8-16.67 18.8-25.11 2.41-3.42 5-4.72 9.33-3.46-3.28 4.35-6.49 8.63-9.72 12.88-4.36 5.73-8.64 11.53-13.16 17.14-1.61 2-1.35 3.3.09 5.19C109.9 76 118.16 87.1 126.67 98.44zM1.33 61.74c.72-3.61 1.2-7.29 2.2-10.83 6-21.43 30.6-30.34 47.5-17.06C60.93 41.64 63.39 52.62 62.9 65H7.1c-.84 22.21 15.15 35.62 35.53 28.78 7.15-2.4 11.36-8 13.47-15 1.07-3.51 2.84-4.06 6.14-3.06-1.69 8.76-5.52 16.08-13.52 20.66-12 6.86-29.13 4.64-38.14-4.89C5.26 85.89 3 78.92 2 71.39c-.15-1.2-.46-2.38-.7-3.57q.03-3.04.03-6.08zm5.87-1.49h50.43c-.33-16.06-10.33-27.47-24-27.57-15-.12-25.78 11.02-26.43 27.57z"
            />
          </svg>
          <span>express.js</span>
          <Rating rating="4.5" />
        </li>
        <li>
          <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M127.403 22.767a1.824 1.824 0 0 0-1.24-.414c-1.236 0-2.833.838-3.693 1.287l-.34.175a11.721 11.721 0 0 1-4.612 1.16 64.756 64.756 0 0 0-4.896.34c-10.91 1.121-15.777 9.484-20.464 17.57-2.552 4.399-5.188 8.969-8.802 12.46-.747.724-1.541 1.4-2.378 2.02-3.74 2.78-8.435 4.765-12.088 6.17-3.518 1.345-7.359 2.553-11.066 3.722-3.4 1.07-6.609 2.082-9.56 3.178-1.144.422-2.299.823-3.459 1.205-2.688.872-4.626 1.54-7.458 3.49a47.949 47.949 0 0 0-2.963 2.183 31.255 31.255 0 0 0-5.913 6.227 36.767 36.767 0 0 1-4.966 5.961c-.598.584-1.659.872-3.248.872-1.86 0-4.115-.384-6.501-.79-2.462-.435-5.006-.85-7.188-.85-1.771 0-3.13.29-4.141.873 0 0-1.708.995-2.427 2.282l.707.32a14.493 14.493 0 0 1 3.02 2.181 15.153 15.153 0 0 0 3.141 2.234c.365.134.695.344.97.616-.296.436-.734.999-1.193 1.6-2.517 3.296-3.987 5.377-3.145 6.511.404.21.855.312 1.31.297 5.49 0 8.44-1.426 12.17-3.233 1.082-.522 2.182-1.06 3.491-1.615 2.182-.946 4.531-2.456 7.022-4.054 3.26-2.124 6.668-4.306 9.976-5.358a27.188 27.188 0 0 1 8.391-1.179c3.492 0 7.167.466 10.71.92 2.641.342 5.377.69 8.06.852a50.27 50.27 0 0 0 2.946.092 34.127 34.127 0 0 0 3.757-.196l.3-.105c1.883-1.158 2.765-3.64 3.618-6.04.551-1.546 1.014-2.933 1.747-3.814.043-.043.09-.082.14-.117a.175.175 0 0 1 .213.034v.07c-.435 9.387-4.215 15.348-8.038 20.646l-2.552 2.736s3.573 0 5.607-.786c7.42-2.217 13.018-7.104 17.093-14.899a63.583 63.583 0 0 0 2.693-6.15c.07-.172.712-.496.65.407-.021.267-.04.563-.061.874 0 .182 0 .37-.035.558-.104 1.31-.414 4.076-.414 4.076l2.29-1.227c5.525-3.49 9.784-10.533 13.015-21.491 1.344-4.566 2.33-9.1 3.197-13.093 1.039-4.801 1.935-8.915 2.96-10.512 1.61-2.506 4.067-4.2 6.445-5.844.323-.222.65-.437.97-.673 2.988-2.098 5.96-4.52 6.616-9.037v-.1c.474-3.37.073-4.228-.384-4.621z"
            />
          </svg>
          <span>MariaDB / MySQL</span>
          <Rating rating="4.5" />
        </li>
        <li>
          <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M116.452 6.643a59.104 59.104 0 01-6.837 12.136A64.249 64.249 0 0064.205-.026C28.984-.026 0 28.982 0 64.242a64.316 64.316 0 0019.945 46.562l2.368 2.1a64.22 64.22 0 0041.358 15.122c33.487 0 61.637-26.24 64.021-59.683 1.751-16.371-3.051-37.077-11.24-61.7zM29.067 111.17a5.5 5.5 0 01-4.269 2.034c-3.018 0-5.487-2.484-5.487-5.502 0-3.017 2.485-5.501 5.487-5.501 1.25 0 2.485.433 3.452 1.234 2.351 1.9 2.718 5.384.817 7.735zm87.119-19.238c-15.843 21.122-49.68 14.003-71.376 15.02 0 0-3.852.234-7.721.867 0 0 1.45-.617 3.335-1.334 15.226-5.301 22.43-6.335 31.685-11.086 17.427-8.869 34.654-28.274 38.24-48.463-6.637 19.422-26.75 36.11-45.077 42.895-12.557 4.635-35.238 9.136-35.238 9.136l-.917-.484c-15.442-7.518-15.91-40.977 12.157-51.78 12.291-4.735 24.048-2.134 37.323-5.302 14.175-3.367 30.568-14.004 37.238-27.874 7.471 22.19 16.46 56.932.35 78.405z"
            />
          </svg>
          <span>Springboot</span>
          <Rating rating="4" />
        </li>
      </ul>
    </section>
    <ImageAsset
      src="bridge.jpeg"
      alt="Bridge"
      height="1280"
      sizes="320px sm:640px md:768px lg:1024px xl:1280px 2xl:1536px"
      fit="cover"
      :modifiers="{ position: 'top' }"
      class="-mt-2 h-[1280px] w-full object-cover [mask-image:linear-gradient(to_bottom,black_80%,transparent)]"
      @load="setUpTimeline"
    />
    <section class="mx-auto max-w-6xl px-8 pb-16 pt-24">
      <h2>Career</h2>
      <div id="timeline" class="mt-16">
        <ul>
          <li v-for="(item, index) in timelineItems" :key="index">
            <div></div>
            <div>
              <span>{{ item.time }}</span>
              <h3>{{ item.title }}</h3>
              <span>{{ item.description }}</span>
            </div>
          </li>
        </ul>
      </div>
    </section>
    <section class="flex flex-col items-center gap-4 px-8 py-16 *:text-center">
      <h2>Got an idea?</h2>
      <p class="lg:text-lg">I got the code. Let's make it a real website!</p>
      <StyledButton primary class="mt-4 !px-8 lg:text-lg" @click="navigateTo('/contact')">
        Contact me
      </StyledButton>
    </section>
  </div>
</template>

<script setup>
useHeadSEO(true, "About • Justus Geramb", "About", "My career as a software developer.", "/about");

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const timelineItems = [
  { time: "2024 - now", title: "devite UG", description: "Co-Founder, Full-Stack Web-Developer" },
  { time: "2023 - 2024", title: "bitbliss GbR", description: "Co-Founder, Software engineer" },
  { time: "2022 - now", title: "duschdichtungsprofile.de", description: "Software engineer" },
  { time: "2022", title: "devite UG", description: "Internship" },
  { time: "2021", title: "CoreMedia", description: "Internship" }
];

function setUpTimeline() {
  const timeline = document.querySelector("#timeline");
  const items = timeline.lastElementChild.children;

  gsap.registerPlugin(ScrollTrigger);

  let isFadingIn = false;
  let queue = [];

  Array.from(items).forEach((item) =>
    ScrollTrigger.create({
      trigger: item,
      start: "top 80%",
      onEnter() {
        function animate() {
          gsap.to(item.firstElementChild, {
            maxHeight: item.scrollHeight,
            duration: 0.5,
            ease: "linear",
            onStart: () => (item.firstElementChild.style.opacity = 1),
            onComplete() {
              if (queue.length > 0) queue.shift()();
              else isFadingIn = false;
            }
          });
          gsap.to(item.lastElementChild, {
            opacity: 1,
            duration: 0.5,
            ease: "expo.in"
          });
        }

        if (!isFadingIn) {
          animate();

          isFadingIn = true;
        } else queue.push(animate);
      }
    })
  );
}
</script>

<style lang="scss" scoped>
h2 {
  @apply font-title text-4xl font-semibold leading-tight tracking-tight lg:text-5xl;
}

#skills ul li {
  @apply flex flex-col items-center gap-4 text-xl;

  svg {
    @apply my-auto w-16 fill-primary-400;
  }

  span {
    @apply mt-2 text-xl;
  }
}

#timeline li {
  @apply relative flex gap-16 [&:last-child_>:first-child]:h-12;

  &:first-child {
    @apply [&_:last-child]:pt-0;

    > :first-child {
      @apply mt-2 before:top-0;
    }
  }

  > :first-child {
    @apply relative max-h-0 w-0.5 shrink-0 overflow-y-clip overflow-x-visible bg-primary-900 opacity-0;

    &::before {
      @apply absolute left-1/2 top-[2.5rem] size-2 -translate-x-1/2 rounded-full bg-primary-800 opacity-[inherit] transition-opacity delay-[250ms] duration-500 content-[''];
    }
  }

  > :last-child {
    @apply pt-8 opacity-0;
  }

  span:first-of-type {
    @apply text-sm text-primary-500;
  }

  h3 {
    @apply mt-2 font-title text-lg font-semibold leading-snug;
  }
}
</style>
