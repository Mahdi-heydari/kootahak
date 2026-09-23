"use client";

import Link from "next/link";
import GetIcon from "@/components/ui/Icon";
import Button from "@/components/ui/Button";
import ThemeToggle from "@/components/ui/theme-toggle";

type DashboardHeaderProps = {
  onMenuClick?: () => void;
};

export default function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  return (
    <header
      className="
        flex items-center justify-between shrink-0 w-full h-22
        px-5 sm:px-7 bg-card
        max-lg:border-b max-lg:border-border
        lg:rounded-token-sm
      "
    >
      {/* Mobile menu button */}
      <button
        type="button"
        onClick={onMenuClick}
        className="md:hidden"
        aria-label="باز کردن منو"
      >
        <GetIcon size={24} name="LayoutGrid" className="text-primary" />
      </button>

      <Link href="/" className="text-token-3xl font-token-bold text-foreground">
        کوتاهک
        <span className="text-brand mr-2">/</span>
      </Link>

      {/* Actions */}
      <div className="flex items-center gap-x-5">
        <div className="flex shrink-0 items-center gap-2 md:gap-3">
          <Link href="/">
            <Button variant="ghost" size="sm">
              خانه
            </Button>
          </Link>

          <ThemeToggle />
        </div>

        <div className="max-lg:hidden w-px h-6 bg-border" />

        <time className="max-lg:hidden text-token-sm text-muted-foreground select-none">
          سه‌شنبه ۳۱ شهریور
        </time>
      </div>
    </header>
  );
}
