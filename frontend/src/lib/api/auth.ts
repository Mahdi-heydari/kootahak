import axios from "axios";
import { apiClient } from "./client";

import type { AuthResponse, LoginPayload, RegisterPayload } from "@/types";

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

export const getInitialData = async (): Promise<AuthResponse | null> => {
  try {
    const { data } = await apiClient.get<AuthResponse>("/api/auth/initialData");
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      return null;
    }

    throw error;
  }
};

export const logout = async (): Promise<void> => {
  await apiClient.post("/api/auth/logout");
};
