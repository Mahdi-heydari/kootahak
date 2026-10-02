import type { LinkSortBy, LinksListParams, SortOrder } from "@/types/links";

export const DEFAULT_LIMIT = 10;
export const MIN_LIMIT = 1;
export const MAX_LIMIT = 50;
export const DEFAULT_SORT_BY: LinkSortBy = "createdAt";
export const DEFAULT_SORT_ORDER: SortOrder = "desc";

export interface ParsedLinksQuery {
  search: string;
  isActive?: boolean;
  isPin?: boolean;
  expired?: boolean;
  sortBy: LinkSortBy;
  sortOrder: SortOrder;
  /** 1-based — UI only */
  page: number;
  limit: number;
}

function parseBoolean(v: string | null): boolean | undefined {
  if (v === "true") return true;
  if (v === "false") return false;
  return undefined;
}

export function parseLinksQuery(params: URLSearchParams): ParsedLinksQuery {
  const rawPage = Number(params.get("page") ?? 1);
  const page = Number.isFinite(rawPage) && rawPage >= 1 ? Math.floor(rawPage) : 1;

  const rawLimit = Number(params.get("limit") ?? DEFAULT_LIMIT);
  const limit = Number.isFinite(rawLimit)
    ? Math.min(MAX_LIMIT, Math.max(MIN_LIMIT, Math.floor(rawLimit)))
    : DEFAULT_LIMIT;

  const sortBy = params.get("sortBy");
  const sortOrder = params.get("sortOrder");

  return {
    search: params.get("search")?.trim() ?? "",
    isActive: parseBoolean(params.get("isActive")),
    isPin: parseBoolean(params.get("isPin")),
    expired: parseBoolean(params.get("expired")),
    sortBy: sortBy === "expiresAt" ? "expiresAt" : DEFAULT_SORT_BY,
    sortOrder: sortOrder === "asc" ? "asc" : DEFAULT_SORT_ORDER,
    page,
    limit,
  };
}

export function toLinksListParams(q: ParsedLinksQuery): LinksListParams {
  const params: LinksListParams = {
    limit: q.limit,
    offset: (q.page - 1) * q.limit,
    sortBy: q.sortBy,
    sortOrder: q.sortOrder,
  };

  if (q.search) params.search = q.search;
  if (q.isActive !== undefined) params.isActive = q.isActive;
  if (q.isPin !== undefined) params.isPin = q.isPin;
  if (q.expired !== undefined) params.expired = q.expired;

  return params;
}


export function buildQueryString(
  current: URLSearchParams,
  updates: Record<string, string | number | boolean | null | undefined>,
): string {
  const next = new URLSearchParams(current.toString());
  for (const [key, value] of Object.entries(updates)) {
    if (value === null || value === undefined || value === "") {
      next.delete(key);
    } else {
      next.set(key, String(value));
    }
  }
  const qs = next.toString();
  return qs ? `?${qs}` : "";
}
