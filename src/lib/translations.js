import i18n from "sveltekit-i18n";

/** @type {import('sveltekit-i18n').Config} */
export const config = ({
  loaders: [
    {
      locale: "fr",
      key: "header",
      loader: async () => (
        await import("./lang/fr/header.json")
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
      key: "data.competences",
      loader: async () => (
        await import("./lang/fr/data/competences.json")
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
      key: "data.hobbies",
      loader: async () => (
        await import("./lang/fr/data/hobbies.json")
      ).default
    },
    {
      locale: "fr",
      key: "parcours",
      loader: async () => (
        await import("./lang/fr/parcours.json")
      ).default
    },
    {
      locale: "fr",
      key: "data.parcours",
      loader: async () => (
        await import("./lang/fr/data/parcours.json")
      ).default
    }
  ]
});

export const { t, locale, locales, loading, loadTranslations } = new i18n(config);
