import { defineCollection } from "astro:content";
import { file } from "astro/loaders";
import { z } from "astro/zod";
import { localized } from "./i18n/localized";

// "2024-03": month precision is all a résumé needs, and it sorts as a string.
const month = z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/, "expected YYYY-MM");

// A draft is shown by `pnpm dev` only, so an entry can be committed before its dates are known.
const dated = z
  .object({
    draft: z.boolean().default(false),
    start: month.optional(),
    // Absent: ongoing.
    end: month.optional(),
  })
  .refine((e) => e.draft || e.start, { message: "start is required unless draft = true" })
  .refine((e) => !e.start || !e.end || e.start <= e.end, { message: "end is before start" });

const link = z.object({ label: z.string(), url: z.url() });

const profile = defineCollection({
  loader: file("src/data/profile.toml"),
  schema: z.object({
    name: z.string(),
    headline: localized,
    location: localized,
    links: z.array(link).default([]),
    summary: localized,
    availability: localized.optional(),
  }),
});

const experience = defineCollection({
  loader: file("src/data/experience.toml"),
  schema: dated.and(
    z.object({
      company: z.string().optional(),
      url: z.url().optional(),
      location: localized.optional(),
      title: localized,
      summary: localized.optional(),
      highlights: z.array(localized).default([]),
      tags: z.array(z.string()).default([]),
    }),
  ),
});

const education = defineCollection({
  loader: file("src/data/education.toml"),
  schema: dated.and(
    z.object({
      school: z.string(),
      url: z.url().optional(),
      location: localized.optional(),
      title: localized,
      summary: localized.optional(),
    }),
  ),
});

// Ordered lists (skills, languages, interests): `order` decides, since table keys carry none.
const ordered = z.object({ order: z.number().int() });

const skills = defineCollection({
  loader: file("src/data/skills.toml"),
  schema: ordered.extend({ label: localized, items: z.array(z.string()).min(1) }),
});

const languages = defineCollection({
  loader: file("src/data/languages.toml"),
  schema: ordered.extend({ name: localized, level: localized }),
});

const interests = defineCollection({
  loader: file("src/data/interests.toml"),
  schema: ordered.extend({ title: localized, description: localized }),
});

export const collections = { profile, experience, education, skills, languages, interests };
