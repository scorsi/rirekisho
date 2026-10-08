import { localeTags, type Locale } from "../i18n/locales";
import { useTranslations } from "../i18n/ui";

type Month = string; // "YYYY-MM"

function toDate(month: Month): Date {
  const [y, m] = month.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, 1));
}

export function formatMonth(month: Month, locale: Locale): string {
  return new Intl.DateTimeFormat(localeTags[locale], {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(toDate(month));
}

// Both ends inclusive: 2017-11 → 2018-04 is 6 months, a single month is 1.
function monthsBetween(start: Month, end: Month): number {
  const a = toDate(start);
  const b = toDate(end);
  return (b.getUTCFullYear() - a.getUTCFullYear()) * 12 + (b.getUTCMonth() - a.getUTCMonth()) + 1;
}

function currentMonth(): Month {
  return new Date().toISOString().slice(0, 7);
}

export function formatPeriod(start: Month | undefined, end: Month | undefined, locale: Locale) {
  const t = useTranslations(locale);
  if (!start) return { range: "", duration: "" };

  const range =
    start === end
      ? formatMonth(start, locale)
      : `${formatMonth(start, locale)} – ${end ? formatMonth(end, locale) : t("date.present")}`;

  const total = monthsBetween(start, end ?? currentMonth());
  const years = Math.floor(total / 12);
  const months = total % 12;
  const duration = [
    years > 0 ? t("duration.years", { n: years }) : "",
    months > 0 ? t("duration.months", { n: months }) : "",
  ]
    .filter(Boolean)
    .join(" ");

  return { range, duration };
}

// "2018" or "2018–20": the short form a line of successive roles needs.
export function formatYears(start: Month, end: Month | undefined): string {
  const from = start.slice(0, 4);
  const to = (end ?? currentMonth()).slice(0, 4);
  return from === to ? from : `${from}–${to.slice(2)}`;
}

// Most recent first; ongoing entries (no end) before finished ones that started at the same time.
export function byRecency<T extends { data: { start?: Month; end?: Month } }>(a: T, b: T): number {
  const start = (b.data.start ?? "9999").localeCompare(a.data.start ?? "9999");
  if (start !== 0) return start;
  return (b.data.end ?? "9999").localeCompare(a.data.end ?? "9999");
}
