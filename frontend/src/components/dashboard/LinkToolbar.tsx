"use client";

import GetIcon from "@/components/ui/Icon";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import Button from "@/components/ui/Button";

const SEARCH_DEBOUNCE_MS = 350;

interface LinkToolbarProps {
  onCreateClick?: () => void;
}

export default function LinkToolbar({ onCreateClick }: LinkToolbarProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const urlSearch = searchParams.get("search") || "";
  const status = searchParams.get("status") || "";
  const sort = searchParams.get("sort") || "";

  const [localSearch, setLocalSearch] = useState(urlSearch);

  useEffect(() => {
    setLocalSearch(urlSearch);
  }, [urlSearch]);

  const createQuery = useCallback(
    (updates: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString());
      for (const [key, value] of Object.entries(updates)) {
        if (value) params.set(key, value);
        else params.delete(key);
      }
      const query = params.toString();
      return query ? `?${query}` : "";
    },
    [searchParams],
  );

  const pushQuery = useCallback(
    (updates: Record<string, string>) => {
      router.replace(`${pathname}${createQuery(updates)}`, { scroll: false });
    },
    [router, pathname, createQuery],
  );

  useEffect(() => {
    if (localSearch === urlSearch) return;
    const timer = setTimeout(() => {
      pushQuery({ search: localSearch });
    }, SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [localSearch, urlSearch, pushQuery]);

  const toggleStatus = () => {
    const next =
      status === "active" ? "inactive" : status === "inactive" ? "" : "active";
    pushQuery({ status: next });
  };

  const cycleSort = () => {
    const next =
      sort === "newest"
        ? "oldest"
        : sort === "oldest"
          ? "popular"
          : sort === "popular"
            ? ""
            : "newest";
    pushQuery({ sort: next });
  };

  const sortLabel =
    sort === "oldest"
      ? "قدیمی‌ترین"
      : sort === "popular"
        ? "محبوب‌ترین"
        : sort === "newest"
          ? "جدیدترین"
          : "مرتب‌سازی";

  const statusLabel =
    status === "inactive" ? "غیرفعال" : status === "active" ? "فعال" : "وضعیت";

  return (
    <div className="flex flex-col gap-3 border-b border-border pb-10 lg:flex-row lg:items-center lg:gap-3">
      {/* Filters group */}
      <div className="grid grid-cols-2 gap-3 md:flex md:items-center">
        <Button
          type="button"
          variant={status ? "outline" : "secondary"}
          size="sm"
          onClick={toggleStatus}
          className="min-h-11 gap-2"
        >
          <GetIcon name="Filter" className="size-4 shrink-0" />
          <span className="truncate">{statusLabel}</span>
        </Button>

        <Button
          type="button"
          variant={sort ? "outline" : "secondary"}
          size="sm"
          onClick={cycleSort}
          className="min-h-11 gap-2"
        >
          <GetIcon name="SlidersHorizontal" className="size-4 shrink-0" />
          <span className="truncate">{sortLabel}</span>
        </Button>
      </div>

      {/* Search */}
      <div className="flex h-11 items-center justify-between gap-x-4 rounded-token-md bg-background-secondary px-4 sm:h-12 lg:grow">
        <input
          type="text"
          placeholder="یافتن لینک مورد نظر ..."
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          className="size-full bg-transparent text-token-sm text-foreground outline-none placeholder:text-muted-foreground"
        />
        <GetIcon
          name="Search"
          size={18}
          className="shrink-0 text-muted-foreground"
        />
      </div>

      {/* Create button */}
      <Button
        type="button"
        size="sm"
        onClick={onCreateClick}
        className="min-h-11 w-full gap-2 sm:w-auto"
      >
        <GetIcon name="Plus" className="size-4 shrink-0" />
        <span>لینک جدید</span>
      </Button>
    </div>
  );
}
