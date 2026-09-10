"use client";

import Link from "next/link";
import { Link2, ShieldCheck, Sparkles } from "lucide-react";

import Button from "@/components/ui/Button";
import ThemeToggle from "@/components/ui/theme-toggle";

type AuthLayoutProps = {
  children: React.ReactNode;
  eyebrow: string;
  title: string;
  description: string;
};

export function AuthLayout({
  children,
  eyebrow,
  title,
  description,
}: AuthLayoutProps) {
  return (
    <section className="min-h-dvh bg-background text-foreground">
      {/* Mobile header */}
      <header className="flex items-center justify-between border-b border-border bg-card px-4 py-3 lg:hidden">
        <Link href="/" className="text-token-xl font-token-bold text-foreground">
          کوتاهک
          <span className="text-brand mr-2">/</span>
        </Link>

        <div className="flex items-center gap-2">
          <Link href="/">
            <Button variant="ghost" size="sm">
              خانه
            </Button>
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <div className="grid lg:min-h-[calc(100dvh-57px)] lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:min-h-dvh">
        {/* Desktop panel */}
        <aside className="relative hidden overflow-hidden border-l border-border bg-card lg:block">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,color-mix(in_srgb,var(--info)_12%,transparent),transparent_42%),radial-gradient(circle_at_80%_0%,color-mix(in_srgb,var(--info)_8%,transparent),transparent_36%)]" />
          <div className="absolute inset-x-10 bottom-10 top-10 rounded-token-xl border border-brand/20 bg-brand/5 shadow-token-sm backdrop-blur-sm" />

          <div className="relative z-10 flex h-full flex-col justify-between p-10 xl:p-14">
            <Link href="/" className="inline-flex w-fit items-center gap-3 rounded-token-full border border-brand/20 bg-brand/10 px-4 py-2">
              <span className="flex size-8 items-center justify-center rounded-token-full bg-brand/15 text-brand">
                <Link2 className="size-4" aria-hidden="true" />
              </span>
              <span className="text-token-sm font-token-medium text-foreground">
                کوتاهک
                <span className="text-brand mr-1.5">/</span>
              </span>
            </Link>

            <div className="max-w-lg space-y-7">
              <div className="space-y-4">
                <p className="label text-brand">{eyebrow}</p>
                <h1 className="h2 text-foreground">{title}</h1>
                <p className="body-muted">{description}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="surface rounded-token-lg p-4 shadow-token-sm">
                  <p className="metric text-brand">24/7</p>
                  <p className="mt-2 label">دسترسی به پنل</p>
                </div>
                <div className="surface rounded-token-lg p-4 shadow-token-sm">
                  <p className="text-token-2xl font-token-semibold text-foreground">امن</p>
                  <p className="mt-2 label">ورود محافظت‌شده</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-6 text-token-sm text-muted-foreground">
              <div className="flex items-center gap-3">
                <ShieldCheck className="size-5 text-brand" aria-hidden="true" />
                اطلاعات حساب شما با دقت نگهداری می‌شود.
              </div>
              <Sparkles className="size-5 text-brand/70" aria-hidden="true" />
            </div>
          </div>
        </aside>

        <main className="flex items-center justify-center px-4 py-8 sm:px-6 sm:py-10 lg:px-10">
          <div className="w-full max-w-md">{children}</div>
        </main>
      </div>
    </section>
  );
}
