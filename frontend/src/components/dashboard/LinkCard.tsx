"use client";

import {
  Copy,
  ExternalLink,
  Eye,
  MoreHorizontal,
  Pin,
} from "lucide-react";

import type { Link } from "@/types/links";

interface LinkCardProps {
  link: Link;
}

export default function LinkCard({ link }: LinkCardProps) {
  const shortUrl = `kootahak.ir/${link.shortCode}`;

  const formattedDate = new Intl.DateTimeFormat("fa-IR", {
    dateStyle: "medium",
  }).format(new Date(link.createdAt));

  return (
    <article className="group rounded-2xl border bg-background p-5 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
            <ExternalLink className="size-5 text-primary" />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="truncate font-semibold">{link.title}</h3>

              {link.isPin && (
                <Pin className="size-3.5 shrink-0 fill-current text-primary" />
              )}
            </div>

            <p className="mt-1 truncate text-xs text-muted-foreground">
              {link.originalUrl}
            </p>
          </div>
        </div>

        <button
          type="button"
          className="shrink-0 rounded-lg p-2 opacity-60 transition hover:bg-muted hover:opacity-100"
          aria-label="عملیات"
        >
          <MoreHorizontal className="size-5" />
        </button>
      </div>

      {/* Short URL */}
      <div className="mt-5 flex items-center gap-2">
        <div className="min-w-0 flex-1 truncate rounded-lg bg-muted px-3 py-2 text-sm font-medium">
          {shortUrl}
        </div>

        <button
          type="button"
          className="rounded-lg border p-2 transition hover:bg-muted"
          aria-label="کپی لینک"
        >
          <Copy className="size-4" />
        </button>
      </div>

      {/* Footer */}
      <div className="mt-5 flex items-center justify-between border-t pt-4">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Eye className="size-3.5" />
            {link.visits.length} بازدید
          </span>

          <span>{formattedDate}</span>
        </div>

        <div className="flex items-center gap-1.5 text-xs">
          <span
            className={`size-2 rounded-full ${
              link.isActive ? "bg-emerald-500" : "bg-zinc-400"
            }`}
          />

          <span
            className={
              link.isActive
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-muted-foreground"
            }
          >
            {link.isActive ? "فعال" : "غیرفعال"}
          </span>
        </div>
      </div>
    </article>
  );
}