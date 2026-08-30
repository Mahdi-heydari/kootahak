import { useMutation } from "@tanstack/react-query";

import { login, register } from "@/lib/api/auth";

import type {
  LoginPayload,
  RegisterPayload,
} from "@/types/auth";

export function useLogin() {
  return useMutation({
    mutationFn: (payload: LoginPayload) => login(payload),
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: (payload: RegisterPayload) => register(payload),
  });
}