// Read at build time only, never committed: the public repository has no phone number in it, and a
// build without the variable simply leaves the line out.
const raw = process.env.RIREKISHO_PHONE?.trim();

export const phone = raw ? { display: raw, href: `tel:${raw.replace(/[^\d+]/g, "")}` } : undefined;
