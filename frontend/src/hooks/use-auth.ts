import { useMutation } from "@tanstack/react-query";
import type { AuthResponse, LoginPayload, RegisterPayload } from "@/types/auth";
import type { AxiosError } from "axios";

import { login, register } from "@/lib/api/auth";

type ApiError = AxiosError<{ statusCode?: number; message?: string }>;

export function useLogin() {
  return useMutation<AuthResponse, ApiError, LoginPayload>({
    mutationFn: (payload) => login(payload),
  });
}

export function useRegister() {
  return useMutation<AuthResponse, ApiError, RegisterPayload>({
    mutationFn: (payload) => register(payload),
  });
}
