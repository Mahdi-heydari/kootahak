import Link from "next/link";
import GetIcon from "@/components/ui/Icon";
import Button from "@/components/ui/Button";
import ThemeToggle from "@/components/ui/theme-toggle";
import { DotPattern } from "./DotPattern";

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
      <header className="lg:fixed left-0 right-0 z-50 flex items-center justify-between border-b border-border bg-card px-4 py-3">
        <Link
          href="/"
          className="text-token-xl font-token-bold text-foreground"
        >
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

      <div className="grid lg:min-h-dvh lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
        {/* Desktop panel */}
        <aside className="relative isolate hidden overflow-hidden border-l border-border bg-card lg:grid">
          <DotPattern />
          <div className="relative z-10 flex h-full flex-col gap-25 p-14 lg:pt-24">
            <div className="flex h-full max-w-lg flex-col justify-around">
              <div className="space-y-4">
                <p className="text-token-xs font-token-semibold uppercase tracking-token-wide text-brand">
                  {eyebrow}
                </p>

                <h1 className="text-token-3xl font-token-bold leading-token-tight tracking-token-tight text-foreground xl:text-token-4xl">
                  {title}
                </h1>

                <p className="text-token-base leading-token-relaxed text-muted-foreground">
                  {description}
                </p>
              </div>

              <div className="flex flex-col justify-between gap-6 text-token-sm text-muted-foreground">
                <div className="flex items-center gap-3">
                  <GetIcon
                    name="ShieldCheck"
                    className="size-5 text-brand"
                    aria-hidden="true"
                  />
                  اطلاعات حساب شما با دقت نگهداری می‌شود.
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-token-lg border border-border bg-card p-4 shadow-token-sm transition-colors hover:border-brand/50 hover:text-brand">
                    <p className="text-token-2xl font-token-bold">24/7</p>
                    <p className="mt-2 text-token-xs font-token-medium uppercase tracking-token-wide">
                      دسترسی به پنل
                    </p>
                  </div>
                  <div className="rounded-token-lg border border-border bg-card p-4 shadow-token-sm transition-colors hover:border-brand/50 hover:text-brand">
                    <p className="text-token-2xl font-token-semibold">امن</p>
                    <p className="mt-2 text-token-xs font-token-medium uppercase tracking-token-wide">
                      ورود محافظت‌شده
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <main className="flex items-center justify-center px-4 py-8 lg:px-10 lg:pt-24">
          <div className="w-full max-w-md">{children}</div>
        </main>
      </div>
    </section>
  );
}
