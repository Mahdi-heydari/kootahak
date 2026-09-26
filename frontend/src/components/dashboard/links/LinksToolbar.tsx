"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import GetIcon from "@/components/ui/Icon";
import Button from "@/components/ui/Button";
import Dropdown, { type DropdownOption } from "@/components/ui/Dropdown";
import { buildQueryString } from "@/lib/links/query-params";

const SEARCH_DEBOUNCE_MS = 350;

type ActiveFilter = "all" | "true" | "false";
type PinFilter = "all" | "true";
type ExpiredFilter = "all" | "true" | "false";
type SortPreset = "newest" | "oldest" | "expiring" | "latest-expire";

// --- options ---
const activeOptions: DropdownOption<ActiveFilter>[] = [
  { value: "all", label: "همه وضعیت‌ها" },
  { value: "true", label: "فقط فعال" },
  { value: "false", label: "فقط غیرفعال" },
];

const pinOptions: DropdownOption<PinFilter>[] = [
  { value: "all", label: "همه لینک‌ها" },
  { value: "true", label: "فقط پین‌شده" },
];

const expiredOptions: DropdownOption<ExpiredFilter>[] = [
  { value: "all", label: "همه انقضاها" },
  { value: "false", label: "معتبر (منقضی‌نشده)" },
  { value: "true", label: "منقضی‌شده" },
];

const sortOptions: DropdownOption<SortPreset>[] = [
  { value: "newest", label: "جدیدترین" },
  { value: "oldest", label: "قدیمی‌ترین" },
  { value: "expiring", label: "نزدیک‌ترین انقضا" },
  { value: "latest-expire", label: "دورترین انقضا" },
];

const sortPresetToParams: Record<
  SortPreset,
  { sortBy: "createdAt" | "expiresAt"; sortOrder: "asc" | "desc" }
> = {
  newest: { sortBy: "createdAt", sortOrder: "desc" },
  oldest: { sortBy: "createdAt", sortOrder: "asc" },
  expiring: { sortBy: "expiresAt", sortOrder: "asc" },
  "latest-expire": { sortBy: "expiresAt", sortOrder: "desc" },
};

interface LinksToolbarProps {
  isFetching?: boolean;
  onCreateClick?: () => void;
}

export default function LinksToolbar({
  isFetching,
  onCreateClick,
}: LinksToolbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // --- read current URL state ---
  const urlSearch = searchParams.get("search") ?? "";
  const active = (searchParams.get("isActive") ?? "all") as ActiveFilter;
  const pin = (
    searchParams.get("isPin") === "true" ? "true" : "all"
  ) as PinFilter;
  const expired = (searchParams.get("expired") ?? "all") as ExpiredFilter;

  const sortBy = searchParams.get("sortBy") ?? "createdAt";
  const sortOrder = searchParams.get("sortOrder") ?? "desc";

  const currentSort: SortPreset =
    (Object.entries(sortPresetToParams).find(
      ([, v]) => v.sortBy === sortBy && v.sortOrder === sortOrder,
    )?.[0] as SortPreset) ?? "newest";

  // --- debounced search ---
  const [localSearch, setLocalSearch] = useState(urlSearch);

  useEffect(() => {
    setLocalSearch(urlSearch);
  }, [urlSearch]);

  function push(
    updates: Record<string, string | number | boolean | null | undefined>,
  ) {
    const qs = buildQueryString(
      new URLSearchParams(searchParams.toString()),
      updates,
    );
    router.replace(`${pathname}${qs}`, { scroll: false });
  }

  useEffect(() => {
    if (localSearch === urlSearch) return;
    const t = setTimeout(() => {
      push({ search: localSearch || null, page: 1 });
    }, SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localSearch]);

  return (
    <div className="flex flex-col gap-3 border-b border-border pb-6 lg:gap-3">
      {/* Filters — dropdowns */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Dropdown
          value={active}
          onChange={(v) => push({ isActive: v === "all" ? null : v, page: 1 })}
          options={activeOptions}
          icon="Filter"
          isActive={active !== "all"}
        />

        <Dropdown
          value={pin}
          onChange={(v) => push({ isPin: v === "all" ? null : v, page: 1 })}
          options={pinOptions}
          icon="Pin"
          isActive={pin !== "all"}
        />

        <Dropdown
          value={expired}
          onChange={(v) => push({ expired: v === "all" ? null : v, page: 1 })}
          options={expiredOptions}
          icon="Clock"
          isActive={expired !== "all"}
        />

        <Dropdown
          value={currentSort}
          onChange={(v) => push({ ...sortPresetToParams[v], page: 1 })}
          options={sortOptions}
          icon="SlidersHorizontal"
          isActive={currentSort !== "newest"}
        />
      </div>

      <div className="flex gap-2 h-12 w-full">
        {" "}
        {/* Search */}
        <div className="flex grow h-full items-center justify-between gap-x-4 rounded-token-md bg-background-secondary px-4 lg:grow">
          <input
            type="text"
            placeholder="یافتن لینک مورد نظر ..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="size-full bg-transparent text-token-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
          <GetIcon
            name={isFetching ? "Loader" : "Search"}
            size={18}
            className={`shrink-0 text-muted-foreground ${
              isFetching ? "animate-spin" : ""
            }`}
          />
        </div>
        {/* Create */}
        <Button
          type="button"
          size="sm"
          onClick={onCreateClick}
          className="h-full gap-2 sm:w-auto"
        >
          <GetIcon name="Plus" className="size-4 shrink-0" />
          <span>لینک جدید</span>
        </Button>
      </div>
    </div>
  );
}
