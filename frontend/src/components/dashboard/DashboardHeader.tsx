"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import ThemeToggle from "../ui/theme-toggle";
import Button from "../ui/Button";

interface DashboardHeaderProps {
  onMenuClick?: () => void;
}

export default function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-3 border-b border-border bg-card px-4 md:h-20 md:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="flex size-11 shrink-0 items-center justify-center rounded-token-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground lg:hidden"
          aria-label="باز کردن منو"
        >
          <Menu className="size-5" />
        </button>

        <div className="min-w-0">
          <h1 className="truncate text-token-lg font-token-semibold md:text-token-xl">
            داشبورد
          </h1>
          <p className="hidden truncate text-token-sm text-muted-foreground sm:block">
            مدیریت لینک‌های کوتاه شما
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2 md:gap-3">
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
