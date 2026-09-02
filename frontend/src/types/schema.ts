import { Link } from "./links";

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