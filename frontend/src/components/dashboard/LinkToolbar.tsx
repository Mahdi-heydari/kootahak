"use client";

import { Filter, Plus, Search, SlidersHorizontal } from "lucide-react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback } from "react";
import Button from "../ui/Button";

const inputClassName =
  "h-12 w-full rounded-token-md border border-border bg-card px-4 text-token-sm text-foreground shadow-token-sm transition-colors duration-token-normal placeholder:text-muted-foreground focus:border-brand/30 focus:outline-none";

export default function LinkToolbar() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const search = searchParams.get("search") || "";
  const status = searchParams.get("status") || "";
  const sort = searchParams.get("sort") || "";

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
      return params.toString();
    },
    [searchParams]
  );

  const updateSearch = (value: string) => {
    router.push(`${pathname}?${createQuery({ search: value })}`);
  };

  const toggleStatus = () => {
    const next = status === "active" ? "inactive" : status === "inactive" ? "" : "active";
    router.push(`${pathname}?${createQuery({ status: next })}`);
  };

  const cycleSort = () => {
    const next = sort === "newest" ? "oldest" : sort === "oldest" ? "popular" : "newest";
    router.push(`${pathname}?${createQuery({ sort: next })}`);
  };

  const sortLabel =
    sort === "oldest" ? "قدیمی‌ترین" : sort === "popular" ? "محبوب‌ترین" : "جدیدترین";

  const statusLabel =
    status === "inactive" ? "غیرفعال" : status === "active" ? "فعال" : "وضعیت";

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative flex-1 sm:max-w-md">
        <Search className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

        <input
          type="text"
          placeholder="جستجوی لینک..."
          value={search}
          onChange={(e) => updateSearch(e.target.value)}
          className={`${inputClassName} pe-10 pr-10`}
        />
      </div>

      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant={status ? "outline" : "secondary"}
          size="sm"
          onClick={toggleStatus}
          className="gap-2"
        >
          <Filter className="size-4" />
          <span>{statusLabel}</span>
        </Button>

        <Button
          type="button"
          variant={sort ? "outline" : "secondary"}
          size="sm"
          onClick={cycleSort}
          className="gap-2"
        >
          <SlidersHorizontal className="size-4" />
          <span>{sortLabel}</span>
        </Button>

        <Button type="button" size="sm" className="gap-2">
          <Plus className="size-4" />
          <span>لینک جدید</span>
        </Button>
      </div>
    </div>
  );
}
