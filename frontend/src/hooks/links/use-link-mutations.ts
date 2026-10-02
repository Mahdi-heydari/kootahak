"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createLink,
  deleteLink,
  setLinkActive,
  setLinkPin,
  updateLink,
  type CreateLinkPayload,
  type UpdateLinkPayload,
} from "@/lib/api/links";

function invalidateLinks(qc: ReturnType<typeof useQueryClient>) {
  qc.invalidateQueries({ queryKey: ["links"] });
}

export function useCreateLink() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateLinkPayload) => createLink(payload),
    onSuccess: () => invalidateLinks(qc),
  });
}

export function useUpdateLink() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateLinkPayload) => updateLink(payload),
    onSuccess: () => invalidateLinks(qc),
  });
}

export function useDeleteLink() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (linkId: number) => deleteLink(linkId),
    onSuccess: () => invalidateLinks(qc),
  });
}

export function useTogglePin() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ linkId, isPin }: { linkId: number; isPin: boolean }) =>
      setLinkPin(linkId, isPin),
    onSuccess: () => invalidateLinks(qc),
  });
}

export function useToggleActive() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ linkId, isActive }: { linkId: number; isActive: boolean }) =>
      setLinkActive(linkId, isActive),
    onSuccess: () => invalidateLinks(qc),
  });
}
