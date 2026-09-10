import type { CreateLinkFormValues } from "@/lib/validations/link";
import type { Link } from "@/types/links";

function slugFromUrl(url: string): string {
  try {
    const { pathname, hostname } = new URL(url);
    const segment = pathname.split("/").filter(Boolean).pop();

    if (segment && segment.length <= 20 && /^[\w-]+$/i.test(segment)) {
      return segment.toLowerCase();
    }

    return hostname.replace(/^www\./, "").split(".")[0].slice(0, 20);
  } catch {
    return "link";
  }
}

function uniqueShortCode(base: string, existing: Set<string>): string {
  const normalized = base
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 20);

  const seed = normalized || "link";
  let candidate = seed;
  let counter = 1;

  while (existing.has(candidate)) {
    const suffix = `-${counter}`;
    candidate = `${seed.slice(0, 20 - suffix.length)}${suffix}`;
    counter += 1;
  }

  return candidate;
}

function defaultTitle(url: string): string {
  try {
    const { hostname } = new URL(url);
    return hostname.replace(/^www\./, "");
  } catch {
    return "لینک جدید";
  }
}

export function buildNewLink(
  input: CreateLinkFormValues,
  existingLinks: Link[],
  authorId = 1,
): Link {
  const existingCodes = new Set(existingLinks.map((link) => link.shortCode));
  const shortCode = input.shortCode?.trim()
    ? input.shortCode.trim().toLowerCase()
    : uniqueShortCode(slugFromUrl(input.originalUrl), existingCodes);

  if (existingCodes.has(shortCode)) {
    throw new Error("duplicate-short-code");
  }

  const now = new Date().toISOString();
  const nextId = existingLinks.reduce((max, link) => Math.max(max, link.id), 0) + 1;

  return {
    id: nextId,
    title: input.title?.trim() || defaultTitle(input.originalUrl),
    shortCode,
    originalUrl: input.originalUrl,
    createdAt: now,
    updatedAt: now,
    isActive: true,
    isPin: false,
    expiresAt: null,
    deletedAt: null,
    authorId,
    visits: [],
  };
}
