"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarItems } from "@/contents/dashboard";
import GetIcon from "@/components/ui/Icon";

interface DashboardSidebarProps {
  mobileOpen?: boolean;
  onClose?: () => void;
}

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  const linkClass = (href: string) =>
    pathname.startsWith(href)
      ? "border border-brand/30 bg-brand/10 text-brand"
      : "text-muted-foreground hover:bg-muted hover:text-foreground";

  return (
    <>
      <div className="mb-8 px-3">
        <Link
          href="/dashboard"
          onClick={onNavigate}
          className="text-token-xl font-token-bold text-foreground"
        >
          کوتاهک
          <span className="text-brand mr-2">/</span>
        </Link>
        <p className="mt-1 text-token-sm text-muted-foreground">
          مدیریت لینک‌ها
        </p>
      </div>

      <nav className="flex-1">
        <ul className="space-y-1">
          {sidebarItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={onNavigate}
                className={`block rounded-token-md px-3 py-2.5 text-token-sm font-token-medium transition-colors duration-token-normal ${linkClass(item.href)}`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="border-t border-border pt-4">
        <Link
          href="/settings"
          onClick={onNavigate}
          className={`flex items-center gap-2 rounded-token-md px-3 py-2.5 text-token-sm transition-colors duration-token-normal ${linkClass("/settings")}`}
        >
          <GetIcon name="Settings" className="size-5" />
          <span>حساب کاربری</span>
        </Link>
      </div>
    </>
  );
}

export function DashboardSidebar({
  mobileOpen = false,
  onClose,
}: DashboardSidebarProps) {
  return (
    <>
      {/* Desktop */}
      <aside className="hidden h-full w-64 shrink-0 flex-col border-l border-border bg-card p-4 lg:flex">
        <SidebarContent />
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/50"
            aria-label="بستن منو"
            onClick={onClose}
          />

          <aside className="absolute inset-y-0 right-0 flex w-72 max-w-[85vw] flex-col border-l border-border bg-card p-4 shadow-token-md">
            <div className="mb-4 flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="flex size-11 items-center justify-center rounded-token-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="بستن منو"
              >
                <GetIcon name="X" className="size-5" />
              </button>
            </div>

            <SidebarContent onNavigate={onClose} />
          </aside>
        </div>
      )}
    </>
  );
}
