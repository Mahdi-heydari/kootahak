"use client";

import { useQuery } from "@tanstack/react-query";
import { getLinkAnalytics } from "@/lib/api/analytics";

export function useLinkAnalytics(linkId: number) {
  return useQuery({
    queryKey: ["links", "analytics", linkId],
    queryFn: () => getLinkAnalytics(linkId),
    enabled: Number.isInteger(linkId) && linkId > 0,
  });
}
