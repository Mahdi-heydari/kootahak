"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import { login, register } from "@/lib/api/auth";
import { currentUserQueryKey } from "@/hooks/auth/use-current-user";
import type { AuthResponse, LoginPayload, RegisterPayload } from "@/types/auth";

type ApiError = AxiosError<{ statusCode?: number; message?: string }>;

export function useLogin() {
  const qc = useQueryClient();

  return useMutation<AuthResponse, ApiError, LoginPayload>({
    mutationFn: (payload) => login(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: currentUserQueryKey });
    },
  });
}

export function useRegister() {
  const qc = useQueryClient();

  return useMutation<AuthResponse, ApiError, RegisterPayload>({
    mutationFn: (payload) => register(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: currentUserQueryKey });
    },
  });
}
