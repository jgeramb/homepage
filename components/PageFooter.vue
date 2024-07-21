<template>
  <footer
    class="flex gap-8 divide-primary-200 border-t border-t-primary-200 px-8 max-md:flex-col max-md:divide-y max-md:pb-16 max-md:pt-8 max-md:*:pt-8 md:gap-12 md:divide-x md:px-12 md:*:py-12"
  >
    <div class="flex grow flex-col uppercase tracking-wider *:leading-relaxed md:max-w-sm">
      <div class="mb-8 flex w-full gap-8 max-[320px]:gap-4">
        <NuxtImg
          src="brand/logo.svg"
          alt="Banner Logo"
          width="1024"
          height="1024"
          loading="lazy"
          class="mr-auto w-5"
        />
        <a href="tel:+491758842377" aria-label="Phone" class="contact-option">
          <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M11.3205 7.09378L7.10832 1.47754L1.87695 6.7089L2.0386 7.27467C4.13352 14.6069 9.3932 19.8666 16.7254 21.9615L17.2912 22.1231L22.5225 16.8918L16.9063 12.6796L14.75 14.8358C13.6079 14.3485 12.4566 13.5422 11.4572 12.5428C10.4578 11.5434 9.65161 10.3922 9.16425 9.25003L11.3205 7.09378Z"
            />
          </svg>
        </a>
        <a href="https://wa.me/+491758842377" aria-label="WhatsApp" class="contact-option">
          <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M2 3H22V19H6.99607L2 22.0018V3ZM18 10H6V8H18V10ZM6 14H12V12H6V14Z"
            />
          </svg>
        </a>
        <a href="mailto:admin@justix.dev" aria-label="E-Mail" class="contact-option">
          <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M22 4H2V6.35606L12 10.9015L22 6.35605V4ZM22 8.55296L12 13.0984L2 8.55298V20H22V8.55296Z"
            />
          </svg>
        </a>
      </div>
      <p class="font-title font-semibold">Justus Geramb</p>
      <p class="text-sm">
        Winzeldorfer Str. 48c<br />
        25474 Bönningstedt<br />
      </p>
    </div>
    <nav class="flex gap-x-16 gap-y-8 max-md:flex-col md:pl-16">
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

  svg {
    @apply size-5 fill-primary-950 transition-transform duration-300 ease-in-out will-change-transform;
  }

  &:hover svg {
    @apply scale-90;
  }
}

ul {
  @apply flex flex-wrap items-center gap-x-4 gap-y-0.5 divide-primary-200 *:leading-none max-md:divide-x md:flex-col md:items-start md:gap-y-2 max-md:[&_li:first-child]:w-full max-md:[&_li:not(:nth-child(2)):not(:first-child)]:pl-4 max-md:[&_li:nth-child(2)]:!border-l-0;

  h2 {
    @apply font-title text-xs font-semibold uppercase tracking-widest max-md:mr-4 md:mb-4 md:text-sm;
  }

  li > a {
    @apply relative inline-block uppercase tracking-widest hover:after:w-full max-md:py-1 md:text-sm;

    &::after {
      @apply absolute left-0 top-full h-px w-0 bg-current transition-[width] ease-out content-[''];
    }
  }
}
</style>
