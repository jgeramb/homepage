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
              d="M7.80002 2.4C7.62609 2.16809 7.36008 2.02307 7.07091 2.00252C6.78175 1.98197 6.4979 2.08791 6.29292 2.2929L2.29292 6.2929C2.03612 6.54969 1.93873 6.92553 2.0385 7.27472C4.13342 14.6069 9.3931 19.8666 16.7253 21.9615C17.0745 22.0613 17.4503 21.9639 17.7071 21.7071L21.7071 17.7071C21.9121 17.5021 22.0181 17.2183 21.9975 16.9291C21.977 16.64 21.8319 16.3739 21.6 16.2L17.6 13.2C17.2019 12.9014 16.6448 12.941 16.2929 13.2929L14.7499 14.8359C13.6078 14.3485 12.4565 13.5423 11.4571 12.5429C10.4577 11.5435 9.65151 10.3922 9.16415 9.25009L10.7071 7.70711C11.059 7.35522 11.0986 6.79812 10.8 6.4L7.80002 2.4Z"
            />
          </svg>
        </a>
        <a href="https://wa.me/+491758842377" aria-label="WhatsApp" class="contact-option">
          <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M2 6C2 4.34315 3.34315 3 5 3H19C20.6546 3 22 4.33733 22 5.99648V16.0011C22 17.6587 20.6561 19 19 19H6.99607L3.51503 21.0916C3.20611 21.2772 2.82123 21.2822 2.50757 21.1047C2.19391 20.9273 2 20.5948 2 20.2344V6ZM6 9C6 8.44772 6.44772 8 7 8H17C17.5523 8 18 8.44772 18 9C18 9.55228 17.5523 10 17 10H7C6.44772 10 6 9.55228 6 9ZM7 12C6.44772 12 6 12.4477 6 13C6 13.5523 6.44772 14 7 14H11C11.5523 14 12 13.5523 12 13C12 12.4477 11.5523 12 11 12H7Z"
            />
          </svg>
        </a>
        <a href="mailto:admin@justix.dev" aria-label="E-Mail" class="contact-option">
          <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M2.06315 6.38476L11.5862 10.7134C11.8491 10.8329 12.1509 10.8329 12.4138 10.7134L21.9369 6.38475C21.653 5.02301 20.446 4 19 4H5C3.55401 4 2.34697 5.02302 2.06315 6.38476ZM22 8.55296L13.2414 12.5341C12.4526 12.8927 11.5473 12.8927 10.7586 12.5341L2 8.55298V17C2 18.6569 3.34315 20 5 20H19C20.6569 20 22 18.6569 22 17V8.55296Z"
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
