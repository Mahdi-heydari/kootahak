"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getLinks } from "@/lib/api/links";
import type { LinksListParams } from "@/types/links";

export const linksQueryKey = (params: LinksListParams) =>
  ["links", "list", params] as const;

export function useLinks(params: LinksListParams) {
  return useQuery({
    queryKey: linksQueryKey(params),
    queryFn: () => getLinks(params),
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  });
}
