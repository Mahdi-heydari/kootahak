"use client";

import Link from "next/link";
import ThemeToggle from "../ui/theme-toggle";
import Button from "../ui/Button";

export default function DashboardHeader() {
  return (
    <header className="flex h-20 items-center justify-between border-b border-border bg-card px-6">
      <div>
        <h1 className="h3">داشبورد</h1>
        <p className="mt-0.5 text-token-sm text-muted-foreground">
          مدیریت لینک‌های کوتاه شما
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Link href="/">
          <Button variant="ghost" size="sm">
            خانه
          </Button>
        </Link>

        <ThemeToggle />
      </div>
    </header>
  );
}
