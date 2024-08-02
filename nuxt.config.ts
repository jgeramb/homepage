// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: false
  },

  spaLoadingTemplate: false,
  pages: true,
  css: ["assets/scss/master.scss"],

  // modules
  modules: ["@nuxtjs/tailwindcss", "@nuxt/image", "@nuxt/content"],

  tailwindcss: {
    cssPath: "assets/scss/tailwind.scss",
    viewer: false
  },

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
    }
  },

  // environment
  runtimeConfig: {
    mailHost: "",
    mailPort: "",
    mailSecure: "",
    mailUser: "",
    mailPassword: "",
    mailRecipient: "",
    public: {
      baseURL: ""
    }
  },

  // app
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      htmlAttrs: {
        lang: "en",
        prefix: "og: https://ogp.me/ns#"
      },
      meta: [
        {
          "http-equiv": "X-UA-Compatible",
          content: "IE=edge"
        },
        // SEO
        {
          name: "site_name",
          content: "Justus Geramb"
        },
        {
          property: "og:type",
          content: "website"
        },
        {
          name: "og:image",
          content: "/seo/banner.png"
        },
        {
          property: "twitter:card",
          content: "summary"
        },
        {
          name: "twitter:image",
          content: "/seo/banner.png"
        },
        // Windows
        {
          name: "msapplication-TileColor",
          content: "#fafafa"
        },
        {
          name: "msapplication-Config",
          content: "/browserconfig.xml"
        },
        // styles
        {
          name: "theme-color",
          content: "#09090b"
        },
        {
          name: "apple-mobile-web-app-status-bar-style",
          content: "#09090b"
        }
      ],
      link: [
        // seo
        {
          rel: "shortcut icon",
          sizes: "48x48",
          href: "/favicon.ico"
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/seo/favicon-32x32.png"
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/seo/favicon-16x16.png"
        },
        // Safari
        {
          rel: "apple-touch-icon",
          type: "image/png",
          sizes: "180x180",
          href: "/apple-touch-icon.png"
        },
        {
          rel: "manifest",
          href: "/site.webmanifest"
        },
        {
          rel: "mask-icon",
          href: "/seo/safari-pinned-tab.svg",
          color: "#09090b"
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
              "image": "${process.env.NUXT_PUBLIC_BASE_URL}/images/portrait.jpeg",
              "name": "Justus Geramb",
              "alternateName": "JustixDev",
              "jobTitle": "Web Developer",
              "description": "Web Developer",
              "email": "admin@justix.dev",
              "telephone": "+491758842377",
              "sameAs": [
                "https://www.linkedin.com/in/justus-geramb-8a329b267",
                "https://www.instagram.com/justixdev",
                "https://www.youtube.com/@justixdev",
                "https://x.com/JustixDeveloper"
              ]
            }
          }`
        }
      ]
    },
    layoutTransition: { name: "layout", mode: "out-in" },
    pageTransition: { name: "page", mode: "out-in" }
  },

  // server
  nitro: {
    prerender: {
      routes: ["/"],
      crawlLinks: true,
      failOnError: false
    }
  },

  compatibilityDate: "2024-07-16"
});
