import { Link2, ShieldCheck, Sparkles } from "lucide-react";

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
    <section className="grid min-h-screen bg-background text-foreground lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
      <aside className="relative hidden overflow-hidden bg-primary text-primary-foreground lg:block">
        <div className="absolute inset-0 opacity-70 [background:radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.18),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.12)_0%,transparent_38%)]" />
        <div className="absolute inset-x-10 bottom-10 top-10 rounded-token-xl border border-primary-foreground/10 bg-primary-foreground/5 shadow-md backdrop-blur-sm" />

        <div className="relative z-10 flex h-full flex-col justify-between p-10 xl:p-14">
          <div className="inline-flex w-fit items-center gap-3 rounded-full border border-primary-foreground/15 bg-primary-foreground/10 px-4 py-2 text-sm">
            <span className="flex size-8 items-center justify-center rounded-full bg-primary-foreground text-primary">
              <Link2 className="size-4" aria-hidden="true" />
            </span>
            کوتاهک
          </div>

          <div className="max-w-lg space-y-7">
            <div className="space-y-4">
              <p className="text-xs font-medium text-primary-foreground/70">
                {eyebrow}
              </p>
              <h1 className="text-4xl font-semibold leading-tight text-primary-foreground xl:text-5xl">
                {title}
              </h1>
              <p className="text-sm leading-7 text-primary-foreground/70">
                {description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-token-md border border-primary-foreground/12 bg-primary-foreground/10 p-4">
                <p className="font-mono text-2xl font-medium text-primary-foreground">
                  24/7
                </p>
                <p className="mt-2 text-xs text-primary-foreground/65">
                  دسترسی به پنل
                </p>
              </div>
              <div className="rounded-token-md border border-primary-foreground/12 bg-primary-foreground/10 p-4">
                <p className="text-2xl font-semibold text-primary-foreground">
                  امن
                </p>
                <p className="mt-2 text-xs text-primary-foreground/65">
                  ورود محافظت‌شده
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-6 text-sm text-primary-foreground/70">
            <div className="flex items-center gap-3">
              <ShieldCheck
                className="size-5 text-primary-foreground"
                aria-hidden="true"
              />
              اطلاعات حساب شما با دقت نگهداری می‌شود.
            </div>
            <Sparkles className="size-5 text-primary-foreground/70" aria-hidden="true" />
          </div>
        </div>
      </aside>

      <main className="flex min-h-screen items-center justify-center px-4 py-10 sm:px-6 lg:px-10">
        <div className="w-full max-w-md">{children}</div>
      </main>
    </section>
  );
}
