// Read at build time only, never committed: the public repository has no email address or phone
// number in it, and a build without a variable simply leaves its line out.
const env = (name: string) => process.env[name]?.trim() || undefined;

const rawEmail = env("RIREKISHO_EMAIL");
const rawPhone = env("RIREKISHO_PHONE");

export const email = rawEmail ? { display: rawEmail, href: `mailto:${rawEmail}` } : undefined;

export const phone = rawPhone
  ? { display: rawPhone, href: `tel:${rawPhone.replace(/[^\d+]/g, "")}` }
  : undefined;
