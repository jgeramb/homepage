import { defineCollection, defineContentConfig, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    career: defineCollection({
      type: "data",
      source: "career/**/*.json",
      schema: z.object({
        start_year: z.number(),
        end_year: z.number().optional(),
        title: z.string(),
        description: z.string()
      })
    }),
    references: defineCollection({
      type: "data",
      source: "references/**/*.json",
      schema: z.object({
        title: z.string(),
        year: z.number(),
        description: z.string(),
        links: z.array(
          z.object({
            title: z.string(),
            url: z.string()
          })
        )
      })
    }),
    skills: defineCollection({
      type: "data",
      source: "skills/**/*.json",
      schema: z.object({
        title: z.string(),
        icon: z.object({
          name: z.string(),
          width: z.number(),
          height: z.number()
        }),
        rating: z.number().min(0).max(5)
      })
    })
  }
});
