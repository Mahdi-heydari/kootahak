"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import GetIcon from "@/components/ui/Icon";
import Button from "@/components/ui/Button";
import { buildQueryString } from "@/lib/links/query-params";

interface LinkPaginationProps {
  page: number;
  totalPages: number;
  limit: number;
}

export default function LinkPagination({
  page,
  totalPages,
  limit,
}: LinkPaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function goTo(target: number) {
    if (target < 1 || target > totalPages) return;
    const qs = buildQueryString(new URLSearchParams(searchParams.toString()), {
      page: target,
    });
    router.replace(`${pathname}${qs}`, { scroll: false });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const pages = buildPageList(page, totalPages);

  return (
    <nav
      className="flex flex-wrap items-center justify-center gap-2 pt-2"
      aria-label="صفحه‌بندی"
    >
      <Button
        variant="outline"
        size="sm"
        onClick={() => goTo(page - 1)}
        disabled={page <= 1}
        className="min-h-11 gap-1.5"
      >
        <GetIcon name="ChevronRight" className="size-4" />
        قبلی
      </Button>

      {pages.map((p, i) =>
        p === "…" ? (
          <span
            key={`gap-${i}`}
            className="px-2 text-token-sm text-muted-foreground"
          >
            …
          </span>
        ) : (
          <button
            key={p}
            type="button"
            onClick={() => goTo(p)}
            aria-current={p === page ? "page" : undefined}
            dir="ltr"
            className={`min-w-11 h-11 rounded-token-md text-token-sm font-token-medium transition-colors ${
              p === page
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-foreground hover:bg-border-hover"
            }`}
          >
            {p}
          </button>
        ),
      )}

      <Button
        variant="outline"
        size="sm"
        onClick={() => goTo(page + 1)}
        disabled={page >= totalPages}
        className="min-h-11 gap-1.5"
      >
        بعدی
        <GetIcon name="ChevronLeft" className="size-4" />
      </Button>
    </nav>
  );
}

function buildPageList(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages: (number | "…")[] = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  if (start > 2) pages.push("…");
  for (let i = start; i <= end; i++) pages.push(i);
  if (end < total - 1) pages.push("…");
  pages.push(total);

  return pages;
}
