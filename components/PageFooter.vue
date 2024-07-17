<template>
  <footer
    class="mt-6 grid grid-cols-1 gap-6 divide-primary-200 border-t border-t-primary-200 max-md:divide-y max-md:pb-6 max-md:*:px-6 max-md:*:pt-6 md:grid-cols-[24rem_1fr] md:divide-x md:px-6 md:*:py-6"
  >
    <div class="flex flex-col font-title uppercase tracking-wider *:leading-relaxed">
      <div class="mb-6 flex w-full gap-6">
        <NuxtImg
          src="brand/banner.svg"
          alt="Banner Logo"
          width="300"
          height="105.44"
          loading="lazy"
          class="mr-auto w-[6.403rem]"
        />
        <a href="https://wa.me/+491758842377" class="contact-option">
          <GoogleIcon>phone</GoogleIcon>
        </a>
        <a href="mailto:admin@justix.dev" class="contact-option">
          <GoogleIcon>email</GoogleIcon>
        </a>
      </div>
      <p class="font-semibold">Justus Geramb</p>
      <p class="text-sm">
        Winzeldorfer Str. 48c<br />
        25474 Bönningstedt<br />
      </p>
    </div>
    <nav class="flex gap-12 max-md:flex-col md:pl-6">
      <ul>
        <li>
          <h2>Me</h2>
        </li>
        <li>
          <NuxtLink to="/about">About</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/references">References</NuxtLink>
        </li>
      </ul>
      <ul>
        <li>
          <h2>Legal</h2>
        </li>
        <li>
          <NuxtLink to="/imprint">Imprint</NuxtLink>
        </li>
      </ul>
    </nav>
  </footer>
</template>

<style scoped lang="scss">
.contact-option {
  @apply flex items-center gap-2;

  span {
    @apply text-2xl;
  }
}

ul {
  @apply flex flex-col items-start gap-2 *:leading-none;

  h2 {
    @apply mb-2 w-full font-title font-semibold uppercase tracking-widest md:text-sm;
  }

  li > a {
    @apply relative uppercase tracking-widest hover:after:w-full md:text-sm;

    &::after {
      @apply absolute left-0 top-full h-px w-0 bg-current transition-[width] ease-out content-[''];
    }
  }
}
</style>
