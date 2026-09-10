"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarItems } from "@/contents/dashboard";
import { Settings } from "lucide-react";

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-64 flex-col border-l bg-background p-4">
      {/* Logo */}
      <div className="mb-8 px-3">
        <h1 className="text-xl font-bold">کوتاهک</h1>
        <p className="mt-1 text-sm text-muted-foreground">مدیریت لینک‌ها</p>
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
                  className={`block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground"
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
      <div className="border-t pt-4">
        <Link
          href="/settings"
          className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <Settings className="size-5" />
          <span>حساب کاربری</span>
        </Link>
      </div>
    </aside>
  );
}
