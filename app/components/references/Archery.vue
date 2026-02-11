<template>
  <div
    ref="containerRef"
    class="bg-primary-950 text-primary-50 relative h-[calc(100dvh-5rem)] w-full p-8 select-none lg:h-[calc(100dvh-6.3125rem)] [&>div]:flex [&>div]:size-full [&>div]:items-center"
  >
    <img
      id="hit"
      src="assets/icons/cross.svg"
      alt="Cross"
      class="border-primary-800 bg-accent invisible absolute z-10 size-6 -translate-x-1/2 -translate-y-1/2 rounded-full border p-1"
    />
    <canvas
      ref="arrowCanvasRef"
      width="168"
      height="10"
      class="pointer-events-none absolute z-10 max-lg:w-[7.35rem]"
    />
    <Transition>
      <div v-if="!gameActive" class="flex-col justify-center gap-4 text-center">
        <span class="h1 mb-4">Archery</span>
        <StyledButton @click="startGame" primary>Play now</StyledButton>
        <p class="text-primary-400 text-sm">No download required</p>
      </div>
      <div v-else class="flex-wrap gap-x-24 gap-y-8 max-lg:flex-col lg:max-w-6xl">
        <div class="w-full">
          <span class="h1 mb-4">Archery</span>
          <ul v-if="gameActive" class="font-title text-sm leading-relaxed tracking-tight uppercase">
            <li>
              <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M6 5C5.44772 5 5 5.44772 5 6V18C5 18.5523 5.44772 19 6 19H10C10.5523 19 11 19.4477 11 20C11 20.5523 10.5523 21 10 21H6C4.34315 21 3 19.6569 3 18V6C3 4.34315 4.34315 3 6 3H18C19.6569 3 21 4.34315 21 6V10C21 10.5523 20.5523 11 20 11C19.4477 11 19 10.5523 19 10V6C19 5.44772 18.5523 5 18 5H6ZM11.2929 11.2929C11.5478 11.038 11.9203 10.94 12.2676 11.0365L21.2676 13.5365C21.6496 13.6426 21.9329 13.9643 21.9897 14.3567C22.0465 14.749 21.8662 15.1379 21.53 15.348L17.7257 17.7257L15.348 21.53C15.1379 21.8662 14.749 22.0465 14.3567 21.9897C13.9643 21.9329 13.6426 21.6496 13.5365 21.2676L11.0365 12.2676C10.94 11.9203 11.038 11.5478 11.2929 11.2929Z"
                />
              </svg>
              Press and hold <span class="text-primary-400">to charge</span>
            </li>
            <li>
              <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M11.2929 1.39348C11.6834 1.00295 12.3166 1.00295 12.7071 1.39348L16.2426 4.92901C16.6332 5.31954 16.6332 5.9527 16.2426 6.34323L12.7071 9.87876C12.3166 10.2693 11.6834 10.2693 11.2929 9.87876L7.75737 6.34323C7.36684 5.9527 7.36684 5.31954 7.75737 4.92901L11.2929 1.39348ZM5.81282 7.28778C6.07804 7.28778 6.33239 7.39314 6.51993 7.58067L10.2322 11.293C10.4198 11.4805 10.5251 11.7349 10.5251 12.0001C10.5251 12.2653 10.4198 12.5197 10.2322 12.7072L6.51993 16.4195C6.1294 16.81 5.49624 16.81 5.10571 16.4195L1.3934 12.7072C1.20587 12.5197 1.10051 12.2653 1.10051 12.0001C1.10051 11.7349 1.20587 11.4805 1.3934 11.293L5.10571 7.58067C5.29325 7.39314 5.5476 7.28778 5.81282 7.28778ZM17.6569 7.75743C18.0474 7.36691 18.6805 7.36691 19.0711 7.75743L22.6066 11.293C22.9971 11.6835 22.9971 12.3167 22.6066 12.7072L19.0711 16.2427C18.6805 16.6332 18.0474 16.6332 17.6569 16.2427L14.1213 12.7072C13.7308 12.3167 13.7308 11.6835 14.1213 11.293L17.6569 7.75743ZM12 13.4749C12.2652 13.4749 12.5196 13.5803 12.7071 13.7678L16.4194 17.4801C16.8099 17.8706 16.8099 18.5038 16.4194 18.8943L12.7071 22.6066C12.5196 22.7942 12.2652 22.8995 12 22.8995C11.7348 22.8995 11.4804 22.7942 11.2929 22.6066L7.58059 18.8943C7.19007 18.5038 7.19007 17.8706 7.58059 17.4801L11.2929 13.7678C11.4804 13.5803 11.7348 13.4749 12 13.4749Z"
                />
              </svg>
              Drag <span class="text-primary-400">to aim</span>
            </li>
            <li>
              <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M21.0711 2.92892C21.3505 3.20836 21.4392 3.62616 21.2973 3.995L14.2262 22.3798C14.0816 22.7559 13.7254 23.0084 13.3226 23.0204C12.9199 23.0323 12.5493 22.8014 12.3825 22.4346L9.00217 14.9978L1.56538 11.6175C1.19857 11.4507 0.967653 11.0801 0.979628 10.6774C0.991604 10.2746 1.24413 9.91839 1.62021 9.77375L20.005 2.70268C20.3738 2.56082 20.7916 2.64948 21.0711 2.92892Z"
                />
              </svg>
              Release <span class="text-primary-400">to shoot</span>
            </li>
          </ul>
        </div>
        <canvas
          ref="bowCanvasRef"
          width="354"
          height="354"
          class="touch-none max-lg:mx-auto max-lg:size-64"
        />
        <div ref="targetRef" class="relative max-lg:mt-auto lg:ml-auto">
          <div
            class="border-primary-950 flex size-24 items-center justify-center rounded-full border-4 invert"
          >
            <img src="assets/icons/cross.svg" alt="Cross" class="size-6" />
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { useTransitionListener } from "#layers/base/app/composables/transition/listener";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const containerRef = useTemplateRef("containerRef");

useTransitionListener(() => {
  gsap.registerPlugin(ScrollTrigger);
  gsap.from(containerRef.value, {
    yPercent: 25,
    opacity: 0,
    scrollTrigger: {
      trigger: containerRef.value,
      start: "top 90%"
    }
  });
});

const BOW_WIDTH = 4,
  BOW_ANGLE = Math.PI / 3,
  TENSION_DURATION = 1500,
  SHOOT_DURATION = 500,
  MAX_PX_PER_SECOND = 2000;
const gameActive = ref(false);

const bowCanvasRef = useTemplateRef("bowCanvasRef");
const arrowCanvasRef = useTemplateRef("arrowCanvasRef");
const targetRef = useTemplateRef("targetRef");

// tension
let tensionStart = -1;

function beginTension() {
  if (!gameActive.value) return;
  if (shooting.value) return;

  tensionStart = Date.now();

  hideHit();
  renderAll();
}

function getTension() {
  return tensionStart === -1 ? 0 : easeOutCubic(Date.now() - tensionStart, 0, 1, TENSION_DURATION);
}

// rotation
let bowAngle = 0;

function rotateBow(x, y) {
  if (!gameActive.value || !bowCanvasRef.value) return;

  const canvasRect = bowCanvasRef.value.getBoundingClientRect();
  const bowX = canvasRect.x + canvasRect.width / 2;
  const bowY = canvasRect.y + canvasRect.height / 2;

  bowAngle = Math.atan2(y - bowY, x - bowX);

  renderAll();
}

useEventListener<MouseEvent>("mousemove", (event) => rotateBow(event.clientX, event.clientY));
useEventListener<TouchEvent>("touchmove", (event) => {
  if (tensionStart === -1) return;

  rotateBow(event.touches[0]!.clientX, event.touches[0]!.clientY);

  event.preventDefault();
});

// shooting
let shooting = shallowRef(false);
let shootTime = 0;
let shootTension = 0;
let shootAngle = 0;
let shootXVelocity = 0;
let shootYVelocity = 0;

function deltaSeconds() {
  return (Date.now() - shootTime) / 1000;
}

function arrowX() {
  return shootXVelocity * deltaSeconds();
}

function arrowY() {
  const delta = deltaSeconds();

  return shootYVelocity * delta + 0.5 * 540 * Math.pow(delta, 2);
}

function shoot() {
  if (tensionStart === -1) return;

  shooting.value = true;
  shootTime = Date.now();
  shootTension = getTension();
  shootAngle = bowAngle;
  shootXVelocity = Math.cos(bowAngle) * shootTension * MAX_PX_PER_SECOND;
  shootYVelocity = Math.sin(bowAngle) * shootTension * MAX_PX_PER_SECOND;

  tensionStart = -1;

  renderAll();
}

useEventListener("mouseup", shoot, true);
useEventListener("touchend", shoot, true);

// rendering
function renderAll() {
  requestAnimationFrame(() => {
    renderBow();
    renderArrow();
  });
}

function renderBow() {
  if (!bowCanvasRef.value || !targetRef.value) return;

  const { width, height } = bowCanvasRef.value;
  const context = bowCanvasRef.value.getContext("2d");

  if (!context) return;

  context.setTransform(1, 0, 0, 1, 0, 0);
  context.translate(width / 2, height / 2);
  context.clearRect(-width / 2, -height / 2, width, height);
  context.rotate(bowAngle);

  const tensionProgress = shooting.value
    ? shootTension - easeOutElastic(Date.now() - shootTime, 0, shootTension, SHOOT_DURATION / shootTension)
    : getTension();

  if (!shooting.value && tensionStart !== -1) {
    const size = 96 - 48 * tensionProgress;
    const targetRing = targetRef.value.firstElementChild as HTMLDivElement;
    targetRing.style.width = `${size}px`;
    targetRing.style.height = `${size}px`;
  }

  const radius = (height - BOW_WIDTH) / 2;
  const bowOffsetX = (radius - width) / 2;
  const yFactor = 1 - 0.35 * tensionProgress;

  // string
  const bowX = bowOffsetX + radius * Math.cos(BOW_ANGLE);
  const stringX = bowX - 0.35 * tensionProgress * radius;
  const verticalDistanceToCenter = radius * Math.sin(BOW_ANGLE) * yFactor;

  context.beginPath();
  context.moveTo(bowX, -verticalDistanceToCenter);
  context.lineTo(stringX, 0);
  context.lineTo(bowX, verticalDistanceToCenter);
  context.strokeStyle = "#f4f4f5";
  context.lineWidth = 1;
  context.stroke();

  // bow
  context.beginPath();
  context.scale(1, yFactor);
  context.arc(bowOffsetX, 0, radius, -BOW_ANGLE, BOW_ANGLE);
  context.strokeStyle = "#fafafa";
  context.lineWidth = BOW_WIDTH;
  context.stroke();

  // continue rendering
  if (
    (tensionStart !== -1 && tensionProgress < 1) ||
    Date.now() - shootTime < SHOOT_DURATION / shootTension ||
    shooting.value
  )
    requestAnimationFrame(renderBow);
}

function renderArrow() {
  if (!containerRef.value || !bowCanvasRef.value || !arrowCanvasRef.value || !targetRef.value) return;

  const tensionProgress = shooting.value ? shootTension : getTension();
  const shootX = shooting.value ? arrowX() : 0;
  const shootY = shooting.value ? arrowY() : 0;
  const angle = shooting.value
    ? shootX === 0 && shootY === 0
      ? shootAngle
      : Math.atan2(shootY, shootX)
    : bowAngle;

  // move arrow canvas
  const { x: bowX, y: bowY, width: bowWidth, height: bowHeight } = bowCanvasRef.value.getBoundingClientRect();
  const arrowWidth = arrowCanvasRef.value.clientWidth;
  const arrowHeight = arrowCanvasRef.value.clientHeight;
  const canvasX = bowX + (bowWidth - arrowWidth) / 2;
  const canvasY = bowY + (bowHeight - arrowHeight) / 2 + window.scrollY;

  const radius = (bowHeight - BOW_WIDTH) / 2;
  const tensionOffset = 0.35 * tensionProgress * radius;
  const x = canvasX + Math.cos(angle) * (arrowWidth / 2 - tensionOffset) + shootX;
  const y = canvasY + Math.sin(angle) * (arrowWidth / 2 - tensionOffset) + shootY;

  arrowCanvasRef.value.style.left = `${x}px`;
  arrowCanvasRef.value.style.top = `${y - containerRef.value!.offsetTop}px`;
  arrowCanvasRef.value.style.transform = `rotate(${angle}rad)`;

  // begin rendering
  const { width, height } = arrowCanvasRef.value;
  const context = arrowCanvasRef.value.getContext("2d");

  if (!context) return;

  context.setTransform(1, 0, 0, 1, 0, 0);
  context.translate(0, height / 2);
  context.clearRect(0, -height / 2, width, height);

  // arrow
  context.beginPath();
  context.moveTo(0, 0);
  context.lineTo(width - 10, 0);
  context.strokeStyle = "#a1a1aa";
  context.lineWidth = 2;
  context.stroke();

  context.beginPath();
  context.moveTo(22, 0);
  context.lineTo(2, 5);
  context.lineTo(2, -5);
  context.fillStyle = "#fafafa";
  context.fill();

  context.beginPath();
  context.moveTo(width, 0);
  context.lineTo(width - 10, 5);
  context.lineTo(width - 10, -5);
  context.fillStyle = "#fafafa";
  context.fill();

  // collision
  let collides = false;
  let tipX = x + arrowWidth / 2 + Math.cos(angle) * (arrowWidth / 2);
  let tipY = y + arrowHeight / 2 + Math.sin(angle) * (arrowWidth / 2);

  if (tipX >= document.documentElement.clientWidth) {
    collides = true;
    tipX = document.documentElement.clientWidth;
  }

  if (tipX <= 0) {
    collides = true;
    tipX = 0;
  }

  const gameContainerBottom = containerRef.value.getBoundingClientRect().bottom + window.scrollY;

  if (tipY >= gameContainerBottom) {
    collides = true;
    tipY = gameContainerBottom;
  }

  if (tipY <= containerRef.value.getBoundingClientRect().top + window.scrollY) {
    collides = true;
    tipY = containerRef.value.getBoundingClientRect().top + window.scrollY;
  }

  const targetRect = targetRef.value.getBoundingClientRect();
  const targetCenterX = targetRect.x + targetRect.width / 2;
  const targetCenterY = targetRect.y + targetRect.height / 2 + window.scrollY;

  if (
    Math.sqrt(Math.pow(tipX - targetCenterX, 2) + Math.pow(tipY - targetCenterY, 2)) <=
    targetRef.value.clientWidth / 2
  ) {
    collides = true;
  }

  if (shooting.value && collides) {
    shooting.value = false;

    const hit = document.getElementById("hit") as HTMLImageElement;
    hit.style.visibility = "visible";
    hit.style.left = `${tipX}px`;
    hit.style.top = `${tipY - containerRef.value.offsetTop}px`;

    gsap.from(hit, {
      scale: 1.5,
      duration: 0.5,
      ease: "elastic.out"
    });

    renderAll();
    return;
  }

  // continue rendering
  if ((tensionStart !== -1 && tensionProgress < 1) || shooting.value) requestAnimationFrame(renderArrow);
}

function hideHit() {
  if (!gameActive.value) return;

  (document.getElementById("hit") as HTMLImageElement).style.removeProperty("visibility");
}

watch(() => useRoute().path, hideHit);

useEventListener("resize", () => {
  if (!gameActive.value) return;

  hideHit();
  renderAll();
});

function startGame() {
  window.scrollTo({
    top: containerRef.value!.offsetTop - (document.querySelector("header") as HTMLElement).clientHeight - 1
  });

  gameActive.value = true;

  setTimeout(() => {
    if (!bowCanvasRef.value || !targetRef.value) return;

    const targetRect = targetRef.value.getBoundingClientRect();

    rotateBow(targetRect.x + targetRect.width / 2, targetRect.y + targetRect.height / 2);

    bowCanvasRef.value.addEventListener("mousedown", beginTension, true);
    bowCanvasRef.value.addEventListener("touchstart", (event) => {
      beginTension();

      event.preventDefault();
    });
  }, 525);
}
</script>

<style scoped>
@reference "../../assets/css/tailwind.css";

section {
  @apply will-change-[opacity];
}

.v-enter-active,
.v-leave-active {
  @apply transition-opacity duration-500;
}

.v-enter-active {
  @apply delay-500;
}

.v-enter-from,
.v-leave-to {
  @apply opacity-0;
}

ul > li {
  @apply flex items-center gap-2;

  svg {
    @apply fill-primary-50 size-4;
  }
}
</style>
