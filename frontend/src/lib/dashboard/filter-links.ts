import type { Link } from "@/types/links";

export type LinkStatusFilter = "" | "active" | "inactive";
export type LinkSortOption = "newest" | "oldest" | "popular";

export interface LinkFilterParams {
  search?: string;
  status?: LinkStatusFilter;
  sort?: LinkSortOption | "";
}

function matchesSearch(link: Link, query: string): boolean {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return true;

  const haystack = [
    link.title,
    link.shortCode,
    link.originalUrl,
    `kootahak.ir/${link.shortCode}`,
  ]
    .join(" ")
    .toLowerCase();

  return haystack.includes(normalized);
}

function matchesStatus(link: Link, status: LinkStatusFilter): boolean {
  if (!status) return true;
  if (status === "active") return link.isActive;
  return !link.isActive;
}

function compareLinks(a: Link, b: Link, sort: LinkSortOption): number {
  if (sort === "popular") {
    return b.visits.length - a.visits.length;
  }

  const aTime = new Date(a.createdAt).getTime();
  const bTime = new Date(b.createdAt).getTime();

  return sort === "oldest" ? aTime - bTime : bTime - aTime;
}

export function filterAndSortLinks(
  links: Link[],
  params: LinkFilterParams,
): Link[] {
  const search = params.search ?? "";
  const status = params.status ?? "";
  const sort: LinkSortOption =
    params.sort === "oldest" || params.sort === "popular" ? params.sort : "newest";

  return links
    .filter((link) => matchesSearch(link, search) && matchesStatus(link, status))
    .sort((a, b) => {
      if (a.isPin !== b.isPin) {
        return a.isPin ? -1 : 1;
      }

      return compareLinks(a, b, sort);
    });
}
