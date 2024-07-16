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
    format: ["webp"],
    screens: {
      sm: 320,
      md: 768,
      lg: 1024,
      xl: 1280
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
          content: "#020617"
        },
        {
          name: "apple-mobile-web-app-status-bar-style",
          content: "#020617"
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
