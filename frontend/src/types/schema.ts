export const SourceType = {
  DIRECT: "DIRECT",
  SOCIAL: "SOCIAL",
  SEARCH: "SEARCH",
  EMAIL: "EMAIL",
  OTHER: "OTHER",
} as const;

export type SourceType = (typeof SourceType)[keyof typeof SourceType];

export interface User {
  id: number;
  createdAt: string;
  email: string;
  name: string;
  links: Link[];
}

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
  visits: Visit[];
}

export interface Visit {
  id: number;
  visitedAt: string;
  ipAddress: string;
  country: string | null;
  city: string | null;
  device: string | null;
  browser: string | null;
  source: SourceType;
  linkId: number;
}
