"use client";

import { Filter, Plus, Search, SlidersHorizontal } from "lucide-react";

export default function LinkToolbar() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative flex-1 sm:max-w-md">
        <Search className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

        <input
          type="text"
          placeholder="جستجوی لینک..."
          className="h-11 w-full rounded-xl border bg-background pe-10 ps-4 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary"
        />
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          className="flex h-11 items-center gap-2 rounded-xl border px-4 text-sm transition hover:bg-muted"
        >
          <Filter className="size-4" />
          <span>وضعیت</span>
        </button>

        <button
          type="button"
          className="flex h-11 items-center gap-2 rounded-xl border px-4 text-sm transition hover:bg-muted"
        >
          <SlidersHorizontal className="size-4" />
          <span>مرتب‌سازی</span>
        </button>

        <button
          type="button"
          className="flex h-11 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground transition hover:opacity-90"
        >
          <Plus className="size-4" />
          <span>لینک جدید</span>
        </button>
      </div>
    </div>
  );
}