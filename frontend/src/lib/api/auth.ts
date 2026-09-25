import { apiClient } from "./client";

import type {
  AuthResponse,
  LoginPayload,
  RegisterPayload,
  AuthUser,
} from "@/types";

export const register = async (
  payload: RegisterPayload,
): Promise<AuthResponse> => {
  const { data } = await apiClient.post<AuthResponse>(
    "/api/auth/register",
    payload,
  );

  return data;
};

export const login = async (payload: LoginPayload): Promise<AuthResponse> => {
  const { data } = await apiClient.post<AuthResponse>(
    "/api/auth/login",
    payload,
  );

  return data;
};

export const getInitialData = async (): Promise<AuthResponse> => {
  const { data } = await apiClient.get<AuthResponse>("/api/auth/initialData");
  return data;
};
