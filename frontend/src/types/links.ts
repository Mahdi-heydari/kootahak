export type LinkSortBy = "createdAt" | "expiresAt";
export type SortOrder = "asc" | "desc";

export interface Link {
  id: number;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  title: string;
  shortCode: string;
  originalUrl: string;
  expiresAt: string | null;
  isPin: boolean;
  deletedAt: string | null;
  authorId: number;
}

export interface LinksListResponse {
  links: Link[];
  totalCount: number;
  limit: number;
  offset: number;
  totalPages: number;
}

export interface LinksListParams {
  limit?: number;
  offset?: number;
  isActive?: boolean;
  isPin?: boolean;
  expired?: boolean;
  sortBy?: LinkSortBy;
  sortOrder?: SortOrder;
  search?: string;
}

export interface CreateLinkPayload {
  originalUrl: string;
  title: string;
  suggestedCode?: string;
  expiresAt?: string;
}

export interface UpdateLinkPayload {
  linkId: number;
  title?: string;
  shortCode?: string;
  originalUrl?: string;
  expiresAt?: string;
}

export interface SetPinLinkPayload {
  linkId: number;
  isPin: boolean;
}

export interface SetActiveLinkPayload {
  linkId: number;
  isActive: boolean;
}
