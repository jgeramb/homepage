<template>
  <div class="mx-auto flex max-w-6xl flex-col gap-8 px-8 pt-8">
    <h1>Imprint</h1>
    <section>
      <h2>Information according to § 5 TMG</h2>
      <p>
        Justus Geramb<br />
        Winzeldorfer Straße 48c<br />
        25474 Bönningstedt
      </p>
    </section>
    <section>
      <h2>Contact</h2>
      <p>
        Phone: <a href="tel:+491758842377">+49 175 884 2377</a><br />
        Email: <a href="mailto:admin@justix.dev">admin@justix.dev</a>
      </p>
    </section>
    <section>
      <h2>Liability for contents</h2>
      <p>
        As a service provider, we are responsible for our own content on these pages in accordance with
        general legislation pursuant to Section 7 (1) of the German Telemedia Act (TMG). According to §§ 8 to
        10 TMG, however, we are not obligated as a service provider to monitor transmitted or stored
        third-party information or to investigate circumstances that indicate illegal activity. Obligations to
        remove or block the use of information under the general laws remain unaffected. However, liability in
        this regard is only possible from the point in time at which a concrete infringement of the law
        becomes known. If we become aware of any such infringements, we will remove the relevant content
        immediately.
      </p>
    </section>
    <section>
      <h2>Liability for links</h2>
      <p>
        Our offer contains links to external websites of third parties, on whose contents we have no
        influence. Therefore, we cannot assume any liability for these external contents. The respective
        provider or operator of the pages is always responsible for the content of the linked pages. The
        linked pages were checked for possible legal violations at the time of linking. Illegal contents were
        not recognizable at the time of linking. However, a permanent control of the contents of the linked
        pages is not reasonable without concrete evidence of a violation of the law. If we become aware of any
        infringements, we will remove such links immediately.
      </p>
    </section>
    <section>
      <h2>Copyright</h2>
      <p>
        The contents and works created by the site operators on these pages are subject to German copyright
        law. Duplication, processing, distribution, or any form of commercialization of such material beyond
        the scope of the copyright law shall require the prior written consent of its respective author or
        creator. Downloads and copies of this site are only permitted for private, non-commercial use. Insofar
        as the content on this site was not created by the operator, the copyrights of third parties are
        respected. In particular, third-party content is identified as such. Should you nevertheless become
        aware of a copyright infringement, please inform us accordingly. If we become aware of any
        infringements, we will remove such content immediately.
      </p>
    </section>
  </div>
</template>

<script setup>
useHeadSEO(false, "Imprint • Justus Geramb", "Imprint", "Legal information about my homepage.", "/imprint");
useHead({
  script: [
    {
      type: "application/ld+json",
      innerHTML: `{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Imprint",
              "item": "${useRuntimeConfig().public.baseURL}/imprint"
            }
          ]
        }`
    }
  ]
});
</script>

<style lang="scss" scoped>
section {
  @apply flex flex-col gap-4;

  h2 {
    @apply font-title text-2xl leading-snug;
  }

  p {
    @apply hyphens-auto text-justify leading-relaxed;
  }

  a {
    @apply text-primary-500 underline;
  }
}
</style>
