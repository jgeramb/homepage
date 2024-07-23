// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: false
  },

  spaLoadingTemplate: false,
  pages: true,
  css: ["assets/scss/master.scss"],

  // modules
  modules: ["@nuxtjs/tailwindcss", "@nuxt/image"],

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
        lang: "de",
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
          content: "/images/banner.png"
        },
        {
          property: "twitter:card",
          content: "summary"
        },
        {
          name: "twitter:image",
          content: "/images/banner.png"
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
        // icons
        {
          rel: "shortcut icon",
          sizes: "48x48",
          href: "/favicon.ico"
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/icons/favicon-32x32.png"
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/icons/favicon-16x16.png"
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
          href: "/icons/safari-pinned-tab.svg",
          color: "#09090b"
        }
      ],
      script: [
        {
          type: "application/ld+json",
          innerHTML: `{
            "@context": "https://schema.org",
            "@type": "Person",
            "url": "${process.env.NUXT_PUBLIC_BASE_URL}",
            "image": "${process.env.NUXT_PUBLIC_BASE_URL}/images/logo.png",
            "name": "Justus Geramb",
            "jobTitle": "Web Developer",
            "email": "admin@justus.dev",
            "telephone": "+49-175-884-2377",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Winzeldorfer Straße 48c",
              "postalCode": "25474",
              "addressLocality": "Bönningstedt",
              "addressCountry": "DE",
              "addressRegion": "Schleswig-Holstein"
            }
          }`
        },
        {
          type: "application/ld+json",
          innerHTML: `{
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "About",
                "item": "${process.env.NUXT_PUBLIC_BASE_URL}/about"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "References",
                "item": "${process.env.NUXT_PUBLIC_BASE_URL}/references"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "Contact",
                "item": "${process.env.NUXT_PUBLIC_BASE_URL}/contact"
              }
            ]
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
