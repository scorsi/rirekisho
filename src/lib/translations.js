import i18n from "sveltekit-i18n";

/** @type {import('sveltekit-i18n').Config} */
export const config = ({
  loaders: [
    {
      locale: "en",
      key: "common",
      loader: async () => (
        await import("./lang/en/common.json")
      ).default
    },
    {
      locale: "fr",
      key: "common",
      loader: async () => (
        await import("./lang/fr/common.json")
      ).default
    },
    {
      locale: "fr",
      key: "competences",
      loader: async () => (
        await import("./lang/fr/competences.json")
      ).default
    },
    {
      locale: "fr",
      key: "hobbies",
      loader: async () => (
        await import("./lang/fr/hobbies.json")
      ).default
    },
    {
      locale: "fr",
      key: "career",
      loader: async () => (
        await import("./lang/fr/career.json")
      ).default
    }
  ]
});

export const { t, locale, locales, loading, loadTranslations } = new i18n(config);
