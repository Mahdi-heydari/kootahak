import { apiClient } from "./client";

import type {
  AuthResponse,
  LoginPayload,
  RegisterPayload,
} from "@/types";

export const register = async (
  payload: RegisterPayload,
): Promise<AuthResponse> => {
  const { data } = await apiClient.post<AuthResponse>(
    "/auth/register",
    payload,
  );

  return data;
};

export const login = async (
  payload: LoginPayload,
): Promise<AuthResponse> => {
  const { data } = await apiClient.post<AuthResponse>(
    "/auth/login",
    payload,
  );

  return data;
};