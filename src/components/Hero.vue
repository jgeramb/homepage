<template>
  <div class="hero">
    <slot></slot>
  </div>
</template>
<script>
export default {
  emits: ['close']
};
</script>
<style lang="scss">
.hero {
  @apply relative flex w-full flex-col items-center justify-center;

  height: calc(var(--vh, 1vh) * 100);
}
</style>
