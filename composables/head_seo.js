export const useHeadSEO = (index, title, shortTitle, description, path) => {
  const url = useRuntimeConfig().public.baseURL + path;

  useSeoMeta({
    robots: (index ? "" : "no") + "index,follow",
    title,
    description: description,
    ogTitle: shortTitle,
    ogDescription: description,
    twitterTitle: shortTitle,
    twitterDescription: description
  });
  useHead({
    meta: [
      {
        property: "og:url",
        content: url
      },
      {
        name: "twitter:url",
        content: url
      }
    ],
    link: [
      {
        rel: "canonical",
        href: url
      }
    ]
  });
};
