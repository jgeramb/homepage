<template>
  <HeroSection class="flex w-full items-center justify-between gap-x-24 max-lg:flex-col">
    <GoogleIcon
      id="hit"
      class="invisible absolute z-50 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary-200 bg-primary-100 p-1 text-primary-950"
    >
      close
    </GoogleIcon>
    <canvas ref="bowCanvas" width="354" height="354" class="touch-none max-lg:mx-auto max-lg:size-72" />
    <canvas ref="arrowCanvas" width="168" height="10" class="pointer-events-none absolute" />
    <div ref="target" class="relative max-lg:mb-[calc(5*48px/2)] lg:mr-[calc(5*48px/2)]">
      <div
        v-for="index in 5"
        :key="index"
        class="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary-950/50"
        :style="{ width: `${index * 48}px`, height: `${index * 48}px` }"
      ></div>
    </div>
  </HeroSection>
</template>

<script setup>
const BOW_WIDTH = 4,
  BOW_ANGLE = Math.PI / 3,
  TENSION_DURATION = 1500,
  SHOOT_DURATION = 300,
  MAX_PX_PER_SECOND = 2000;

const bowCanvas = ref();
const arrowCanvas = ref();
const target = ref();

// tension
let tensionStart = -1;

function beginTension() {
  if (shooting) return;

  tensionStart = Date.now();

  renderAll();
}

function getTension() {
  return tensionStart === -1 ? 0 : easeOutCubic(Date.now() - tensionStart, 0, 1, TENSION_DURATION);
}

useEventListener("mousedown", beginTension, true, bowCanvas);
useEventListener(
  "touchstart",
  (event) => {
    beginTension();

    event.preventDefault();
  },
  false,
  bowCanvas
);

// rotation
let bowAngle = 0;

function rotateBow(x, y) {
  const canvasRect = bowCanvas.value.getBoundingClientRect();
  const bowX = canvasRect.x + canvasRect.width / 2;
  const bowY = canvasRect.y + canvasRect.height / 2;

  bowAngle = Math.atan2(y - bowY, x - bowX);

  renderAll();
}

useEventListener("mousemove", (event) => rotateBow(event.clientX, event.clientY));
useEventListener("touchmove", (event) => {
  rotateBow(event.touches[0].clientX, event.touches[0].clientY);

  event.preventDefault();
});

// shooting
let shooting = false;
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

function collidesWithRect(x, y, rect) {
  return x > rect.x && x < rect.x + rect.width && y > rect.y && y < rect.y + rect.height;
}

function shoot() {
  if (tensionStart === -1) return;

  shooting = true;
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

  const tensionProgress = shooting
    ? shootTension - easeOutElastic(Date.now() - shootTime, 0, shootTension, SHOOT_DURATION / shootTension)
    : getTension();
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
    shooting
  )
    requestAnimationFrame(renderBow);
}

function renderArrow() {
  const tensionProgress = shooting ? shootTension : getTension();
  const shootX = shooting ? arrowX() : 0;
  const shootY = shooting ? arrowY() : 0;
  const angle = shooting
    ? shootX === 0 && shootY === 0
      ? shootAngle
      : Math.atan2(shootY, shootX)
    : bowAngle;

  // move arrow canvas
  const { x: bowX, y: bowY, width: bowWidth, height: bowHeight } = bowCanvas.value.getBoundingClientRect();
  const { width, height } = arrowCanvas.value;
  const canvasX = bowX + (bowWidth - width) / 2;
  const canvasY = bowY + (bowHeight - height) / 2 + window.scrollY;

  const radius = (bowHeight - BOW_WIDTH) / 2;
  const arrowLength = 0.96 * radius;
  const tensionOffset = 0.35 * tensionProgress * radius;
  const x = canvasX + Math.cos(angle) * (arrowLength / 2 - tensionOffset) + shootX;
  const y = canvasY + Math.sin(angle) * (arrowLength / 2 - tensionOffset) + shootY;

  arrowCanvas.value.style.left = `${x}px`;
  arrowCanvas.value.style.top = `${y}px`;
  arrowCanvas.value.style.transform = `rotate(${angle}rad)`;

  // begin rendering
  const context = arrowCanvas.value.getContext("2d");

  context.setTransform(1, 0, 0, 1, 0, 0);
  context.translate(0, height / 2);
  context.clearRect(0, -height / 2, width, height);

  // arrow
  context.beginPath();
  context.moveTo(0, 0);
  context.lineTo(arrowLength - 10, 0);
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
  context.moveTo(arrowLength, 0);
  context.lineTo(arrowLength - 10, 5);
  context.lineTo(arrowLength - 10, -5);
  context.fillStyle = "#09090b";
  context.fill();

  // collision
  let collides = false;
  let tipX = x + arrowLength / 2 + Math.cos(angle) * (arrowLength / 2);
  let tipY = y + height / 2 + Math.sin(angle) * (arrowLength / 2);

  if (tipX >= document.documentElement.clientWidth) {
    collides = true;
    tipX = document.documentElement.clientWidth;
  }

  if (tipX <= 0) {
    collides = true;
    tipX = 0;
  }

  if (tipY >= document.documentElement.clientHeight) {
    collides = true;
    tipY = document.documentElement.clientHeight;
  }

  if (tipY <= 0) {
    collides = true;
    tipY = 0;
  }

  if (collides) {
    shooting = false;

    const hit = document.getElementById("hit");
    hit.style.visibility = "visible";
    hit.style.left = `${tipX}px`;
    hit.style.top = `${tipY + window.scrollY}px`;

    renderAll();
    return;
  }

  // continue rendering
  if ((tensionStart !== -1 && tensionProgress < 1) || shooting) requestAnimationFrame(renderArrow);
}

useEventListener("resize", () => {
  document.getElementById("hit").style.visibility = "hidden";

  renderAll();
});

useTransitionListener(() => {
  const targetRect = target.value.getBoundingClientRect();

  rotateBow(targetRect.x + targetRect.width / 2, targetRect.y + targetRect.height / 2);
});
</script>
