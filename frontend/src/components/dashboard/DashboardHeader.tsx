"use client";

import { Bell, Search } from "lucide-react";

export default function DashboardHeader() {
  return (
    <header className="flex h-16 items-center justify-between border-b px-6">
      <div>
        <h1 className="text-xl font-semibold">داشبورد</h1>
        <p className="text-sm text-muted-foreground">
          مدیریت لینک‌های کوتاه شما
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          className="rounded-lg p-2 transition hover:bg-muted"
          aria-label="جستجو"
        >
          <Search className="size-5" />
        </button>

        <button
          type="button"
          className="rounded-lg p-2 transition hover:bg-muted"
          aria-label="اعلان‌ها"
        >
          <Bell className="size-5" />
        </button>
      </div>
    </header>
  );
}