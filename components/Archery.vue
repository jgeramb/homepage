<template>
  <Teleport to="body">
    <ImageAsset
      id="dinosaur"
      src="dinosaur.png"
      width="571"
      height="764"
      sizes="256px"
      draggable="false"
      class="pointer-events-none fixed left-8 top-0 z-50 w-[256px] -translate-y-full"
    />
    <GoogleIcon
      id="hit"
      class="invisible absolute z-50 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary-200 bg-accent p-1 text-primary-50"
    >
      close
    </GoogleIcon>
    <canvas
      ref="arrowCanvas"
      width="168"
      height="10"
      class="pointer-events-none absolute max-lg:w-[7.35rem]"
      :class="{ ' z-50': shooting }"
    />
  </Teleport>
  <Transition>
    <HeroSection
      v-if="!gameActive"
      class="flex select-none flex-col items-center justify-center gap-4 text-center"
    >
      <h1 class="mb-4 font-title text-6xl uppercase leading-snug tracking-tight">Archery</h1>
      <StyledButton @click="startGame" primary>Play now</StyledButton>
      <p class="text-sm text-primary-500">No download required</p>
    </HeroSection>
    <HeroSection
      v-else
      id="game-container"
      class="flex w-full select-none flex-wrap items-center gap-x-24 gap-y-8 max-lg:flex-col"
    >
      <div class="w-full">
        <h1 class="mb-4 font-title text-4xl uppercase leading-snug tracking-tight">Archery</h1>
        <ul v-if="gameActive" class="font-title text-sm uppercase leading-relaxed tracking-tight">
          <li><GoogleIcon>left_click</GoogleIcon>Press and hold <span class="opacity-50">to charge</span></li>
          <li><GoogleIcon>drag_click</GoogleIcon>Drag <span class="opacity-50">to aim</span></li>
          <li><GoogleIcon>mouse</GoogleIcon>Release <span class="opacity-50">to shoot</span></li>
        </ul>
      </div>
      <canvas ref="bowCanvas" width="354" height="354" class="touch-none max-lg:mx-auto max-lg:size-64" />
      <div ref="target" class="relative max-lg:mt-auto lg:ml-auto">
        <div class="size-24 rounded-full border-4 border-primary-950/25"></div>
      </div>
    </HeroSection>
  </Transition>
</template>

<script setup>
import { gsap } from "gsap";

const BOW_WIDTH = 4,
  BOW_ANGLE = Math.PI / 3,
  TENSION_DURATION = 1500,
  SHOOT_DURATION = 500,
  MAX_PX_PER_SECOND = 2000;
const gameActive = ref(false);

const bowCanvas = ref();
const arrowCanvas = ref();
const target = ref();

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
  if (!gameActive.value) return;

  const canvasRect = bowCanvas.value.getBoundingClientRect();
  const bowX = canvasRect.x + canvasRect.width / 2;
  const bowY = canvasRect.y + canvasRect.height / 2;

  bowAngle = Math.atan2(y - bowY, x - bowX);

  renderAll();
}

useEventListener("mousemove", (event) => rotateBow(event.clientX, event.clientY));
useEventListener("touchmove", (event) => {
  if (tensionStart === -1) return;

  rotateBow(event.touches[0].clientX, event.touches[0].clientY);

  event.preventDefault();
});

// shooting
let shooting = ref(false);
let shootTime = 0;
let shootTension = 0;
let shootAngle = 0;
let shootXVelocity = 0;
let shootYVelocity = 0;

function deltaSeconds() {
  return (Date.now() - shootTime) / 1000;
}

function arrowX(time) {
  return shootXVelocity * deltaSeconds(time);
}

function arrowY(time) {
  const delta = deltaSeconds(time);

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
  const { width, height } = bowCanvas.value;
  const context = bowCanvas.value.getContext("2d");

  context.setTransform(1, 0, 0, 1, 0, 0);
  context.translate(width / 2, height / 2);
  context.clearRect(-width / 2, -height / 2, width, height);
  context.rotate(bowAngle);

  const tensionProgress = shooting.value
    ? shootTension - easeOutElastic(Date.now() - shootTime, 0, shootTension, SHOOT_DURATION / shootTension)
    : getTension();

  if (!shooting.value && tensionStart !== -1) {
    const size = 96 - 48 * tensionProgress;
    const targetRing = target.value.firstElementChild;
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
  context.strokeStyle = "#71717a";
  context.lineWidth = 1;
  context.stroke();

  // bow
  context.beginPath();
  context.scale(1, yFactor);
  context.arc(bowOffsetX, 0, radius, -BOW_ANGLE, BOW_ANGLE);
  context.strokeStyle = "#09090b";
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
  const tensionProgress = shooting.value ? shootTension : getTension();
  const shootX = shooting.value ? arrowX() : 0;
  const shootY = shooting.value ? arrowY() : 0;
  const angle = shooting.value
    ? shootX === 0 && shootY === 0
      ? shootAngle
      : Math.atan2(shootY, shootX)
    : bowAngle;

  // move arrow canvas
  const { x: bowX, y: bowY, width: bowWidth, height: bowHeight } = bowCanvas.value.getBoundingClientRect();
  const arrowWidth = arrowCanvas.value.clientWidth;
  const arrowHeight = arrowCanvas.value.clientHeight;
  const canvasX = bowX + (bowWidth - arrowWidth) / 2;
  const canvasY = bowY + (bowHeight - arrowHeight) / 2 + window.scrollY;

  const radius = (bowHeight - BOW_WIDTH) / 2;
  const tensionOffset = 0.35 * tensionProgress * radius;
  const x = canvasX + Math.cos(angle) * (arrowWidth / 2 - tensionOffset) + shootX;
  const y = canvasY + Math.sin(angle) * (arrowWidth / 2 - tensionOffset) + shootY;

  arrowCanvas.value.style.left = `${x}px`;
  arrowCanvas.value.style.top = `${y}px`;
  arrowCanvas.value.style.transform = `rotate(${angle}rad)`;

  // begin rendering
  const { width, height } = arrowCanvas.value;
  const context = arrowCanvas.value.getContext("2d");

  context.setTransform(1, 0, 0, 1, 0, 0);
  context.translate(0, height / 2);
  context.clearRect(0, -height / 2, width, height);

  // arrow
  context.beginPath();
  context.moveTo(0, 0);
  context.lineTo(width - 10, 0);
  context.strokeStyle = "#18181b";
  context.lineWidth = 2;
  context.stroke();

  context.beginPath();
  context.moveTo(22, 0);
  context.lineTo(2, 5);
  context.lineTo(2, -5);
  context.fillStyle = "#09090b";
  context.fill();

  context.beginPath();
  context.moveTo(width, 0);
  context.lineTo(width - 10, 5);
  context.lineTo(width - 10, -5);
  context.fillStyle = "#09090b";
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

  const padding = parseFloat(getComputedStyle(document.documentElement).fontSize) * 2;
  const gameContainer = document.getElementById("game-container");

  if (tipY >= gameContainer.getBoundingClientRect().bottom + window.scrollY + padding) {
    collides = true;
    tipY = gameContainer.getBoundingClientRect().bottom + window.scrollY + padding;
  }

  if (tipY <= 0) {
    collides = true;
    tipY = 0;
  }

  const targetRect = target.value.getBoundingClientRect();
  const targetCenterX = targetRect.x + targetRect.width / 2;
  const targetCenterY = targetRect.y + targetRect.height / 2 + window.scrollY;

  if (
    Math.sqrt(Math.pow(tipX - targetCenterX, 2) + Math.pow(tipY - targetCenterY, 2)) <=
    target.value.clientWidth / 2
  ) {
    collides = true;
  }

  const logoRect = document.querySelector("header img").getBoundingClientRect();

  if (
    tipX >= logoRect.x &&
    tipX <= logoRect.x + logoRect.width &&
    tipY >= logoRect.y + window.scrollY &&
    tipY <= logoRect.y + window.scrollY + logoRect.height
  ) {
    shooting.value = false;

    const dinosaur = document.getElementById("dinosaur");

    gsap.fromTo(
      dinosaur,
      {
        top: padding,
        opacity: 0
      },
      {
        duration: 1,
        top: window.innerHeight - padding,
        opacity: 1,
        ease: "expo.in",
        onComplete: () =>
          gsap.to(dinosaur, {
            duration: 1,
            delay: 0.5,
            opacity: 0,
            ease: "power3.inOut"
          })
      }
    );

    renderAll();
    return;
  }

  if (shooting.value && collides) {
    shooting.value = false;

    const hit = document.getElementById("hit");
    hit.style.visibility = "visible";
    hit.style.left = `${tipX}px`;
    hit.style.top = `${tipY}px`;

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

  document.getElementById("hit").style.removeProperty("visibility");
}

watch(() => useRoute().path, hideHit);

useEventListener("resize", () => {
  if (!gameActive.value) return;

  hideHit();
  renderAll();
});

function startGame() {
  gameActive.value = true;

  setTimeout(() => {
    const targetRect = target.value.getBoundingClientRect();

    rotateBow(targetRect.x + targetRect.width / 2, targetRect.y + targetRect.height / 2);

    bowCanvas.value.addEventListener("mousedown", beginTension, true);
    bowCanvas.value.addEventListener("touchstart", (event) => {
      beginTension();

      event.preventDefault();
    });
  }, 525);
}
</script>

<style scoped lang="scss">
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

  .material-symbols-rounded {
    @apply text-xl;
  }
}
</style>
