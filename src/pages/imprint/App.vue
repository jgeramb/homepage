<template>
  <div class="flex min-h-[calc(var(--vh,1vh)*100-40px)] min-w-full flex-col items-center">
    <div class="w-full max-w-3xl px-8 py-6 lg:py-10">
      <h1>Imprint</h1>
      <div class="mt-2 flex flex-col gap-2">
        <h2>Information according to § 5 TMG</h2>
        <p>
          Justus Geramb<br />
          Winzeldorfer Straße 48c<br />
          25474 Bönningstedt
        </p>
        <h2>Contact</h2>
        <p>
          Phone: <a href="tel:+491758842377">+49 175 884 2377</a><br />
          E-Mail: <a href="emailto:admin@justix-dev.com">admin@justix.dev</a>
        </p>
        <h2>Liability for contents</h2>
        <p>
          As a service provider, we are responsible for our own content on these pages in accordance with general legislation pursuant to
          Section 7 (1) of the German Telemedia Act (TMG). According to §§ 8 to 10 TMG, however, we are not obligated as a service provider
          to monitor transmitted or stored third-party information or to investigate circumstances that indicate illegal activity.
          Obligations to remove or block the use of information under the general laws remain unaffected. However, liability in this regard
          is only possible from the point in time at which a concrete infringement of the law becomes known. If we become aware of any such
          infringements, we will remove the relevant content immediately.
        </p>
        <h2>Liability for links</h2>
        <p>
          Our offer contains links to external websites of third parties, on whose contents we have no influence. Therefore, we cannot
          assume any liability for these external contents. The respective provider or operator of the pages is always responsible for the
          content of the linked pages. The linked pages were checked for possible legal violations at the time of linking. Illegal contents
          were not recognizable at the time of linking. However, a permanent control of the contents of the linked pages is not reasonable
          without concrete evidence of a violation of the law. If we become aware of any infringements, we will remove such links
          immediately.
        </p>
        <h2>Copyright</h2>
        <p>
          The contents and works created by the site operators on these pages are subject to German copyright law. Duplication, processing,
          distribution, or any form of commercialization of such material beyond the scope of the copyright law shall require the prior
          written consent of its respective author or creator. Downloads and copies of this site are only permitted for private,
          non-commercial use. Insofar as the content on this site was not created by the operator, the copyrights of third parties are
          respected. In particular, third-party content is identified as such. Should you nevertheless become aware of a copyright
          infringement, please inform us accordingly. If we become aware of any infringements, we will remove such content immediately.
        </p>
        <hr class="border-1 mt-1 border-primary-700" />
        <p class="rounded-xl">
          Source:
          <a href="https://www.e-recht24.de/impressum-generator.html" target="_blank">eRecht24</a>
        </p>
      </div>
    </div>
  </div>
  <CustomFooter />
</template>

<script setup>
import CustomFooter from "@/components/CustomFooter.vue";
import { onMounted } from "vue";

const updateViewportVariables = () => {
  let vh = document.documentElement.clientHeight * 0.01,
    vw = window.innerWidth * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
  document.documentElement.style.setProperty("--vw", `${vw}px`);
};

onMounted(() => {
  window.addEventListener("resize", updateViewportVariables);
  updateViewportVariables();
});
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

a {
  @apply text-link transition hover:text-opacity-70;
}

h2 {
  @apply mt-2.5;
}
</style>
