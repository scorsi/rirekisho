// Adding a language: add it here, then its UI strings in ui.ts. Data fields fall back to the
// default locale when a translation is missing, so content can be translated progressively.
export const locales = ["fr", "en"] as const;
export const defaultLocale = "fr" satisfies Locale;

export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  fr: "Français",
  en: "English",
};

// BCP 47 tags, for <html lang>, Intl formatting and hreflang.
export const localeTags: Record<Locale, string> = {
  fr: "fr-FR",
  en: "en-GB",
};

export function isLocale(value: string | undefined): value is Locale {
  return (locales as readonly string[]).includes(value ?? "");
}
