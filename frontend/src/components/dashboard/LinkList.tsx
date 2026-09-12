import type { Link } from "@/types/links";
import LinkCard from "./LinkCard";

interface LinkListProps {
  links: Link[];
  title?: string;
  description?: string;
  totalCount?: number;
  isFiltered?: boolean;
}

export default function LinkList({
  links,
  title = "لینک‌های اخیر",
  description = "آخرین لینک‌هایی که ایجاد کرده‌ای",
  totalCount,
  isFiltered = false,
}: LinkListProps) {
  const countLabel =
    isFiltered && totalCount !== undefined
      ? `${links.length} از ${totalCount} لینک`
      : `${links.length} لینک`;

  return (
    <section className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <h2 className="h3">{title}</h2>

          <p className="mt-1 text-token-sm text-muted-foreground">
            {description}
          </p>
        </div>

        <span className="label shrink-0">{countLabel}</span>
      </div>

      {links.length === 0 ? (
        <div className="surface rounded-token-xl px-6 py-12 text-center shadow-token-sm">
          <p className="text-token-sm font-token-medium text-foreground">
            لینکی پیدا نشد
          </p>
          <p className="mt-1 text-token-sm text-muted-foreground">
            فیلتر یا عبارت جستجو را تغییر دهید
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
