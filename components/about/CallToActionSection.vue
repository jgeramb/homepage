<template>
  <section class="flex flex-col items-center gap-4 px-8 py-16 *:text-center">
    <h2>Got an idea?</h2>
    <p class="lg:text-lg">I got the code. Let's make it a real website!</p>
    <StyledButton primary class="mt-4 !px-8 lg:text-lg" @click="navigateTo('/contact')">
      Contact me
    </StyledButton>
  </section>
</template>
