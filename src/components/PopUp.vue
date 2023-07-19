<template>
  <div class="popup" @click.stop.prevent="$emit('close')">
    <slot></slot>
  </div>
</template>
<script>
export default {
  emits: ['close']
};
</script>
<style lang="scss">
.popup {
  @apply fixed z-30 flex w-full flex-col items-center justify-center bg-primary-950 bg-opacity-80;

  height: calc(var(--vh, 1vh) * 100);
}
</style>
