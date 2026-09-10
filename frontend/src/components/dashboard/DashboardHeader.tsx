"use client";

import Link from "next/link";
import ThemeToggle from "../ui/theme-toggle";

export default function DashboardHeader() {
  return (
    <header className="flex h-20 items-center justify-between border-b px-6">
      <div>
        <h1 className="text-xl font-semibold">داشبورد</h1>
        <p className="text-sm text-muted-foreground">
          مدیریت لینک‌های کوتاه شما
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Link
          href="/"
          className="rounded-lg px-4 py-2 text-sm font-medium transition hover:bg-muted"
        >
          خانه
        </Link>

        <ThemeToggle />
      </div>
    </header>
  );
}
