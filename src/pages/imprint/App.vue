<template>
  <div class="app-container flex min-w-full flex-col items-center">
    <Imprint />
  </div>
  <CFooter />
</template>

<script>
import CFooter from '@/components/CFooter.vue';
import Imprint from './components/Imprint.vue';

export default {
  components: {
    CFooter,
    Imprint
  },
  methods: {
    updateViewportVariables() {
      let vh = document.documentElement.clientHeight * 0.01,
        vw = window.innerWidth * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      document.documentElement.style.setProperty('--vw', `${vw}px`);
    }
  },
  mounted() {
    window.addEventListener('resize', this.updateViewportVariables);

    this.updateViewportVariables();
  }
};
</script>

<style lang="scss">
/* Scrollbar */

::-webkit-scrollbar {
  height: 7px;
  width: 7px;
}

::-webkit-scrollbar-track {
  background-color: #040406;
}

::-webkit-scrollbar-thumb {
  background-color: #1a212a;
  border-radius: 5.625px;
}

body {
  scrollbar-color: transparent;
  scrollbar-width: thin;
}

/* App container */

.app-container {
  min-height: calc(var(--vh, 1vh) * 100 - 40px);
}
</style>
