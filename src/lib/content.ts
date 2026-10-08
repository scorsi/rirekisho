import { getCollection, getEntry } from "astro:content";
import { byRecency } from "./dates";

// Drafts exist so an entry can be committed before it is complete: visible in `pnpm dev`, never built.
const visible = ({ data }: { data: { draft?: boolean } }) => import.meta.env.DEV || !data.draft;
const byOrder = <T extends { data: { order: number } }>(a: T, b: T) => a.data.order - b.data.order;

export async function getProfile() {
  const entry = await getEntry("profile", "me");
  if (!entry) throw new Error("src/data/profile.toml must define a [me] table");
  return entry.data;
}

// One function per collection rather than a generic one: getCollection over a union of collection
// names returns a union of entry types, which loses each collection's fields.
export const getExperience = async () =>
  (await getCollection("experience", visible)).sort(byRecency);
export const getEducation = async () => (await getCollection("education", visible)).sort(byRecency);
export const getSkills = async () => (await getCollection("skills")).sort(byOrder);
export const getLanguages = async () => (await getCollection("languages")).sort(byOrder);
export const getInterests = async () => (await getCollection("interests")).sort(byOrder);
