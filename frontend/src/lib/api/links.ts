import { apiClient } from "./client";
import type {
  Link,
  LinksListParams,
  LinksListResponse,
} from "@/types/links";

export async function getLinks(params: LinksListParams): Promise<LinksListResponse> {
  const { data } = await apiClient.get<LinksListResponse>("/api/links", { params });
  return data;
}

export interface CreateLinkPayload {
  originalUrl: string;
  title: string;
  suggestedCode?: string;
  expiresAt?: string;
}

export async function createLink(payload: CreateLinkPayload): Promise<Link> {
  const { data } = await apiClient.post<Link>("/api/links", payload);
  return data;
}

export interface UpdateLinkPayload {
  linkId: number;
  title?: string;
  shortCode?: string;
  originalUrl?: string;
  expiresAt?: string;
}

export async function updateLink(payload: UpdateLinkPayload): Promise<Link> {
  const { data } = await apiClient.put<Link>("/api/links", payload);
  return data;
}

export async function deleteLink(linkId: number): Promise<Link> {
  const { data } = await apiClient.delete<Link>(`/api/links/${linkId}`);
  return data;
}

export async function setLinkPin(linkId: number, isPin: boolean): Promise<Link> {
  const { data } = await apiClient.patch<Link>("/api/links/pin", { linkId, isPin });
  return data;
}

export async function setLinkActive(linkId: number, isActive: boolean): Promise<Link> {
  const { data } = await apiClient.patch<Link>("/api/links/active", {
    linkId,
    isActive,
  });
  return data;
}
