"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { currentUserQueryKey } from "@/hooks/auth/use-current-user";

async function logoutRequest(): Promise<void> {
  const res = await fetch("/api/auth/logout", {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("logout failed");
  }
}

export function useLogout() {
  const qc = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: logoutRequest,
    onSuccess: () => {
      qc.removeQueries({ queryKey: currentUserQueryKey });
      qc.removeQueries({ queryKey: ["links"] });

      router.push("/login");
      router.refresh();
    },
    onError: () => {
      qc.removeQueries({ queryKey: currentUserQueryKey });
      qc.removeQueries({ queryKey: ["links"] });
      router.push("/login");
    },
  });
}
