import type { LinkAnalytics } from "@/types/analytics";
import { apiClient } from "./client";

export async function getLinkAnalytics(linkId: number): Promise<LinkAnalytics> {
  const { data } = await apiClient.get<LinkAnalytics>(
    `/api/links/${linkId}/analytics`,
  );
  return data;
}
