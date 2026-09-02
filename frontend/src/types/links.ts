import { Visit } from "./schema";

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