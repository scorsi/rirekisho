import { z } from "astro/zod";
import { defaultLocale, locales, type Locale } from "./locales";

// A translatable text: the default locale is required, the others optional.
export const localized = z.object(
  Object.fromEntries(
    locales.map((l) => [l, l === defaultLocale ? z.string().min(1) : z.string().min(1).optional()]),
  ) as Record<Locale, z.ZodString | z.ZodOptional<z.ZodString>>,
);

export type Localized = z.infer<typeof localized>;

export function pick(text: Localized, locale: Locale): string;
export function pick(text: Localized | undefined, locale: Locale): string | undefined;
export function pick(text: Localized | undefined, locale: Locale) {
  if (!text) return undefined;
  const t = text as Partial<Record<Locale, string>>;
  return t[locale] ?? t[defaultLocale];
}
