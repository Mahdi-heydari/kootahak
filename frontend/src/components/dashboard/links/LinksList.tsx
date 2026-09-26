"use client";

import type { Link } from "@/types/links";
import LinkCard from "./LinkCard";
import LinksSkeleton from "./LinksSkeleton";

interface LinksListProps {
  links: Link[];
  totalCount: number;
  isFiltered: boolean;
  isLoading: boolean;
}

export default function LinksList({
  links,
  totalCount,
  isFiltered,
  isLoading,
}: LinksListProps) {
  const countLabel = isFiltered
    ? `${links.length} از ${totalCount} لینک`
    : `${totalCount} لینک`;

  return (
    <section className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="block h-1 w-4 bg-brand" />
            <h2 className="h3">لینک‌های شما</h2>
          </div>
          <p className="mt-1 text-token-sm text-muted-foreground">
            لینک‌های کوتاه‌شده‌ی خود را مدیریت کنید
          </p>
        </div>
        <span className="label shrink-0">{countLabel}</span>
      </div>

      {isLoading && links.length === 0 ? (
        <LinksSkeleton />
      ) : links.length === 0 ? (
        <div className="surface rounded-token-xl px-6 py-12 text-center shadow-token-sm">
          <p className="text-token-sm font-token-medium text-foreground">
            {isFiltered
              ? "لینکی با این فیلترها پیدا نشد"
              : "هنوز لینکی نساخته‌اید"}
          </p>
          <p className="mt-1 text-token-sm text-muted-foreground">
            {isFiltered
              ? "فیلتر یا عبارت جستجو را تغییر دهید"
              : "اولین لینک کوتاه خود را بسازید"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {links.map((link) => (
            <LinkCard key={link.id} link={link} />
          ))}
        </div>
      )}
    </section>
  );
}
