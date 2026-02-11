// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2026-02-11",

  extends: [
    [
      "github:devite-io/nuxt-base-layer",
      {
        auth: process.env.NUXT_GITHUB_TOKEN,
        meta: { name: "base" }
      }
    ]
  ],

  // modules
  modules: ["@nuxt/image", "@nuxt/content"],

  image: {
    provider: "ipx",
    dir: "assets/images",
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      "2xl": 1536
    },
    densities: [1, 2],
    format: ["avif", "webp", "jpeg"]
  },

  // environment
  runtimeConfig: {
    mail: {
      recipient: "",
      smtp: {
        host: "",
        port: 465,
        tls: true,
        username: "",
        password: ""
      }
    }
  },

  // app
  app: {
    head: {
      htmlAttrs: { lang: "en" },
      meta: [
        // OpenGraph + Twitter
        { name: "site_name", content: "Justus Geramb" },
        { name: "og:image", content: process.env.NUXT_PUBLIC_BASE_URL + "/assets/images/banner.png" },
        { name: "twitter:image", content: process.env.NUXT_PUBLIC_BASE_URL + "/assets/images/banner.png" }
      ],
      link: [
        // font preloading: Outfit
        {
          rel: "preload",
          as: "font",
          type: "font/woff2",
          href: "/assets/fonts/Outfit/de+en/SemiBold.woff2",
          crossorigin: "anonymous"
        },
        // font preloading: Inter
        {
          rel: "preload",
          as: "font",
          type: "font/woff2",
          href: "/assets/fonts/Inter/de+en/Regular.woff2",
          crossorigin: "anonymous"
        }
      ],
      script: [
        {
          type: "application/ld+json",
          innerHTML: `{
            "@context": "https://schema.org",
            "@type": "ProfilePage",
            "dateCreated": "2024-08-01T00:00:00Z",
            "dateModified": "2024-08-02T00:00:00Z",
            "mainEntity": {
              "@type": "Person",
              "url": "${process.env.NUXT_PUBLIC_BASE_URL}",
              "image": "${process.env.NUXT_PUBLIC_BASE_URL}/assets/images/portrait.jpeg",
              "name": "Justus Geramb",
              "alternateName": "Justix",
              "jobTitle": "Web Developer",
              "description": "Web Developer",
              "email": "admin@justix.dev",
              "telephone": "+491758842377",
              "sameAs": [
                "https://github.com/jgeramb",
                "https://www.linkedin.com/in/justus-geramb-8a329b267/",
                "https://www.instagram.com/justixdev",
                "https://www.youtube.com/@justixdev"
              ]
            }
          }`
        }
      ]
    }
  },

  // server
  nitro: {
    prerender: {
      routes: ["/"],
      crawlLinks: true,
      failOnError: false
    }
  },

  // imports
  imports: {
    dirs: ["composables/**"]
  }
});
