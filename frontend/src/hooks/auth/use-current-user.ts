"use client";

import { useQuery } from "@tanstack/react-query";
import { getInitialData } from "@/lib/api/auth";

export const currentUserQueryKey = ["auth", "me"] as const;

export function useCurrentUser() {
  return useQuery({
    queryKey: currentUserQueryKey,
    queryFn: getInitialData,
    select: (response) => response.data,
    staleTime: 5 * 60 * 1000, // 5 min
    retry: false,
  });
}
