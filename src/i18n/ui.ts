import { defaultLocale, type Locale } from "./locales";

const ui = {
  fr: {
    "meta.title": "CV de {name}",
    "section.summary": "Profil",
    "section.experience": "Expérience",
    "section.education": "Formation",
    "section.skills": "Compétences",
    "section.languages": "Langues",
    "section.interests": "Intérêts",
    "date.present": "aujourd'hui",
    "date.unknown": "dates à compléter",
    "duration.years": "{n} an|{n} ans",
    "duration.months": "{n} mois|{n} mois",
    "action.pdf": "PDF",
    "action.theme": "Changer de thème",
    "theme.light": "clair",
    "theme.dark": "sombre",
    "theme.system": "auto",
    draft: "brouillon",
    "contract.freelance": "freelance",
    "contract.internship": "stage",
    "contract.apprenticeship": "alternance",
    "experience.earlier": "Stages et freelance pendant les études",
    "print.online": "version en ligne",
    "footer.updated": "mis à jour le {date}",
  },
  en: {
    "meta.title": "{name} — Résumé",
    "section.summary": "Profile",
    "section.experience": "Experience",
    "section.education": "Education",
    "section.skills": "Skills",
    "section.languages": "Languages",
    "section.interests": "Interests",
    "date.present": "present",
    "date.unknown": "dates to come",
    "duration.years": "{n} yr|{n} yrs",
    "duration.months": "{n} mo|{n} mos",
    "action.pdf": "PDF",
    "action.theme": "Switch theme",
    "theme.light": "light",
    "theme.dark": "dark",
    "theme.system": "auto",
    draft: "draft",
    "contract.freelance": "freelance",
    "contract.internship": "internship",
    "contract.apprenticeship": "apprenticeship",
    "experience.earlier": "Internships and freelance work during my studies",
    "print.online": "online version",
    "footer.updated": "updated {date}",
  },
} satisfies Record<typeof defaultLocale, Record<string, string>> & Record<Locale, unknown>;

export type UiKey = keyof (typeof ui)[typeof defaultLocale];

// `t("duration.years", { n: 2 })`: "{n}" is replaced, and "one|other" picks a plural form.
export function useTranslations(locale: Locale) {
  const plural = new Intl.PluralRules(locale);
  return (key: UiKey, vars: Record<string, string | number> = {}): string => {
    let text: string = (ui[locale] as Record<string, string>)[key] ?? ui[defaultLocale][key];
    if (text.includes("|")) {
      const [one, other] = text.split("|");
      text = plural.select(Number(vars.n ?? 0)) === "one" ? one : other;
    }
    return text.replace(/\{(\w+)\}/g, (_, name) => String(vars[name] ?? `{${name}}`));
  };
}
