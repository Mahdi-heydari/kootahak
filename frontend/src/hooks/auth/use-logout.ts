"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { logout as logoutRequest } from "@/lib/api/auth";
import { currentUserQueryKey } from "@/hooks/auth/use-current-user";

export function useLogout() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: logoutRequest,
    onSuccess: () => {
      qc.removeQueries({ queryKey: currentUserQueryKey });
      qc.removeQueries({ queryKey: ["links"] });
      toast.success("از حساب خارج شدید");
      window.location.assign("/");
    },
    onError: () => {
      toast.error("خروج از حساب انجام نشد");
    },
  });
}
