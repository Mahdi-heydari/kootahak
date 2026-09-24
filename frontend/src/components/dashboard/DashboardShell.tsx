"use client";

import { useState, type ReactNode } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

interface DashboardShellProps {
  children: ReactNode;
}

export default function DashboardShell({ children }: DashboardShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <section className="relative h-dvh lg:h-auto flex lg:items-start lg:gap-x-8 lg:p-9 max-w-360 mx-auto">
      {/* Mobile overlay */}
      <div
        onClick={() => setSidebarOpen(false)}
        className={`fixed inset-0 bg-black/20 md:hidden z-40 transition-all duration-300 ${
          sidebarOpen
            ? "visible opacity-100"
            : "invisible opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      />

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <section className="flex flex-col lg:gap-y-8 w-full overflow-hidden">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />

        <section className="bg-card p-5 sm:p-7 lg:rounded-token-sm h-full overflow-auto">
          {children}
        </section>
      </section>
    </section>
  );
}
