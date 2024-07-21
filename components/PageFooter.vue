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
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="130 -830 700 700" class="aspect-square">
            <path
              d="M789-130q-120 0-238.5-53.25t-216-151.25q-98-97.5-151.25-216T130-789q0-17.5 11.75-29.25T171-830h155q14 0 24.25 8.75T363-799l26 136q2 13.5-1.25 24.25T377-620l-94.5 96q20.5 37 47.25 71t58.75 65.5q30 30 63.75 56.5T524-282l95-94q8.5-8.5 20-12t24-2l135 27q14 3.5 23 14.25t9 23.75v154q0 17.5-11.75 29.25T789-130Z"
            />
          </svg>
        </a>
        <a href="https://wa.me/+491758842377" aria-label="WhatsApp" class="contact-option">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="90 -871 780 723.68" class="aspect-[539/500]">
            <path
              d="m244-249-90 90q-18 18-41 8.25T90-185.5V-796q0-31 22-53t53-22h630q31 0 53 22t22 53v472q0 31-22 53t-53 22H244Zm39.5-156h236q15.5 0 26.5-11t11-26.5q0-15.5-11-26.5t-26.5-11h-236q-15.5 0-26.5 11t-11 26.5q0 15.5 11 26.5t26.5 11Zm0-118h393q15.5 0 26.5-11t11-26.5q0-15.5-11-26.5t-26.5-11h-393q-15.5 0-26.5 11t-11 26.5q0 15.5 11 26.5t26.5 11Zm0-118h393q15.5 0 26.5-11t11-26.5q0-15.5-11-26.5t-26.5-11h-393q-15.5 0-26.5 11t-11 26.5q0 15.5 11 26.5t26.5 11Z"
            />
          </svg>
        </a>
        <a href="mailto:admin@justix.dev" aria-label="E-Mail" class="contact-option">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="90 -791 780 622" class="aspect-[627/500]">
            <path
              d="M165-169q-31 0-53-22t-22-53v-472q0-31 22-53t53-22h630q31 0 53 22t22 53v472q0 31-22 53t-53 22H165Zm315-281q5 0 9.75-1.5t9.75-4l280.5-176q7-5 11-11.75t4-15.25q0-18.5-15.75-28.25t-32.75.75L480-519 213.5-686q-16-9.5-32.25-.5t-16.25 28q0 9 4.25 16t10.75 11l280.5 176q5 2.5 9.75 4T480-450Z"
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
    @apply h-5 fill-primary-950 transition-transform duration-300 ease-in-out will-change-transform;
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
