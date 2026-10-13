import { toIsoDateTime } from "@/lib/links/datetime";
import type {
  CreateLinkPayload,
  Link,
  LinksListParams,
  LinksListResponse,
  SetActiveLinkPayload,
  SetPinLinkPayload,
  UpdateLinkPayload,
} from "@/types/links";
import { apiClient } from "./client";

export async function getLinks(
  params: LinksListParams,
): Promise<LinksListResponse> {
  const { data } = await apiClient.get<LinksListResponse>("/api/links", {
    params,
  });
  return data;
}

export async function createLink(payload: CreateLinkPayload): Promise<Link> {
  const { data } = await apiClient.post<Link>("/api/links", payload);
  return data;
}

export async function updateLink(payload: UpdateLinkPayload): Promise<Link> {
  const { data } = await apiClient.put<Link>("/api/links", payload);
  return data;
}

export async function deleteLink(linkId: number): Promise<Link> {
  const { data } = await apiClient.delete<Link>(`/api/links/${linkId}`);
  return data;
}

export async function setLinkPin(payload: SetPinLinkPayload): Promise<Link> {
  const { data } = await apiClient.patch<Link>("/api/links/pin", payload);
  return data;
}

export async function setLinkActive(
  payload: SetActiveLinkPayload,
): Promise<Link> {
  const { data } = await apiClient.patch<Link>("/api/links/active", payload);
  return data;
}

export function buildCreateLinkPayload(input: {
  originalUrl: string;
  title: string;
  suggestedCode?: string;
  expiresAt?: string;
}): CreateLinkPayload {
  const payload: CreateLinkPayload = {
    originalUrl: input.originalUrl.trim(),
    title: input.title.trim(),
  };

  const suggestedCode = input.suggestedCode?.trim();
  if (suggestedCode) payload.suggestedCode = suggestedCode;

  const expiresAt = toIsoDateTime(input.expiresAt);
  if (expiresAt) payload.expiresAt = expiresAt;

  return payload;
}

export function buildUpdateLinkPayload(
  linkId: number,
  input: {
    originalUrl: string;
    title: string;
    shortCode: string;
    expiresAt?: string;
  },
): UpdateLinkPayload {
  const payload: UpdateLinkPayload = {
    linkId,
    originalUrl: input.originalUrl.trim(),
    title: input.title.trim(),
    shortCode: input.shortCode.trim(),
  };

  const expiresAt = toIsoDateTime(input.expiresAt);
  if (expiresAt) payload.expiresAt = expiresAt;

  return payload;
}
