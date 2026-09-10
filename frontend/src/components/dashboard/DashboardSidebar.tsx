"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarItems } from "@/contents/dashboard";
import { Settings } from "lucide-react";

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-64 flex-col border-l border-border bg-card p-4">
      {/* Logo */}
      <div className="mb-8 px-3">
        <Link href="/dashboard" className="text-token-xl font-token-bold text-foreground">
          کوتاهک
          <span className="text-brand mr-2">/</span>
        </Link>
        <p className="mt-1 text-token-sm text-muted-foreground">مدیریت لینک‌ها</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1">
        <ul className="space-y-1">
          {sidebarItems.map((item) => {
            const isActive = pathname.startsWith(item.href);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`block rounded-token-md px-3 py-2.5 text-token-sm font-token-medium transition-colors duration-token-normal ${
                    isActive
                      ? "border border-brand/30 bg-brand/10 text-brand"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="border-t border-border pt-4">
        <Link
          href="/settings"
          className={`flex items-center gap-2 rounded-token-md px-3 py-2.5 text-token-sm transition-colors duration-token-normal ${
            pathname.startsWith("/settings")
              ? "border border-brand/30 bg-brand/10 text-brand"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          }`}
        >
          <Settings className="size-5" />
          <span>حساب کاربری</span>
        </Link>
      </div>
    </aside>
  );
}
