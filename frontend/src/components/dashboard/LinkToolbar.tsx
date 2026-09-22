"use client";

import GetIcon from "@/components/ui/Icon";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import Button from "../ui/Button";

const SEARCH_DEBOUNCE_MS = 350;

const inputClassName =
  "h-11 w-full rounded-token-md border border-border bg-card px-4 text-token-sm text-foreground shadow-token-sm transition-colors duration-token-normal placeholder:text-muted-foreground focus:border-brand/30 focus:outline-none sm:h-12";

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
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
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
    <div className="flex flex-col gap-3">
      <div className="relative w-full">
        <GetIcon
          name="Search"
          className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
        />

        <input
          type="text"
          placeholder="جستجوی لینک..."
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          className={`${inputClassName} pe-10 pr-10`}
        />
      </div>

      <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center">
        <Button
          type="button"
          variant={status ? "outline" : "secondary"}
          size="sm"
          onClick={toggleStatus}
          className="min-h-11 w-full gap-2 sm:w-auto"
        >
          <GetIcon name="Filter" className="size-4 shrink-0" />
          <span className="truncate">{statusLabel}</span>
        </Button>

        <Button
          type="button"
          variant={sort ? "outline" : "secondary"}
          size="sm"
          onClick={cycleSort}
          className="min-h-11 w-full gap-2 sm:w-auto"
        >
          <GetIcon name="SlidersHorizontal" className="size-4 shrink-0" />
          <span className="truncate">{sortLabel}</span>
        </Button>

        <Button
          type="button"
          size="sm"
          onClick={onCreateClick}
          className="col-span-2 min-h-11 w-full gap-2 sm:col-span-1 sm:ms-auto sm:w-auto"
        >
          <GetIcon name="Plus" className="size-4 shrink-0" />
          <span>لینک جدید</span>
        </Button>
      </div>
    </div>
  );
}
