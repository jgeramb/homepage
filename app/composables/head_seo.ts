import type { ResolvableValue } from "unhead/types";

export const useHeadSEO = (
  index: boolean,
  title: ResolvableValue<string>,
  shortTitle: ResolvableValue<string>,
  description: ResolvableValue<string>,
  path: string
) => {
  const url = useRuntimeConfig().public.baseUrl + path;

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
      { property: "og:url", content: url },
      { name: "twitter:url", content: url }
    ],
    link: [{ rel: "canonical", href: url }]
  });
};
