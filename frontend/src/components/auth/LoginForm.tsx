"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Link2, LockKeyhole, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";

import { loginSchema } from "@/lib/validations/auth";
import { useLogin } from "@/hooks/use-auth";

import type { LoginFormValues } from "@/lib/validations/auth";

export function LoginForm() {
  const loginMutation = useLogin();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    loginMutation.mutate(data, {
      onSuccess: () => {
        router.push("/dashboard");
      },
    });
  };

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
              <p className="label text-primary-foreground/70">
                مدیریت لینک‌ها
              </p>
              <h1 className="h1 text-primary-foreground">
                سریع وارد شوید و لینک‌های کوتاه خود را مدیریت کنید
              </h1>
              <p className="body text-primary-foreground/70">
                پنل کوتاهک برای ساخت، پیگیری و مدیریت لینک‌ها طراحی شده تا
                مسیرهای مهم شما همیشه مرتب و قابل اندازه‌گیری بمانند.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-token-md border border-primary-foreground/12 bg-primary-foreground/10 p-4">
                <p className="metric text-primary-foreground">24/7</p>
                <p className="mt-2 text-xs text-primary-foreground/65">
                  دسترسی به پنل
                </p>
              </div>
              <div className="rounded-token-md border border-primary-foreground/12 bg-primary-foreground/10 p-4">
                <p className="metric text-primary-foreground">امن</p>
                <p className="mt-2 text-xs text-primary-foreground/65">
                  ورود محافظت‌شده
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 text-sm text-primary-foreground/70">
            <ShieldCheck className="size-5 text-primary-foreground" aria-hidden="true" />
            اطلاعات حساب شما فقط برای ورود به پنل استفاده می‌شود.
          </div>
        </div>
      </aside>

      <main className="flex min-h-screen items-center justify-center px-4 py-10 sm:px-6 lg:px-10">
        <div className="w-full max-w-md space-y-8">
          <div className="space-y-3">
            <div className="flex size-12 items-center justify-center rounded-token-lg bg-muted text-foreground">
              <LockKeyhole className="size-5" aria-hidden="true" />
            </div>
            <div className="space-y-2">
              <p className="label">ورود به حساب</p>
              <h2 className="h2">خوش برگشتید</h2>
              <p className="body-muted">
                ایمیل و رمز عبور خود را وارد کنید تا به داشبورد کوتاهک بروید.
              </p>
            </div>
          </div>

          <form
            className="space-y-5"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <div className="space-y-2">
              <label className="label block text-foreground" htmlFor="email">
                ایمیل
              </label>

              <input
                className="h-12 w-full rounded-token-md border border-border bg-card px-4 text-sm text-foreground shadow-sm transition-colors placeholder:text-muted-foreground focus:border-border-hover focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                aria-invalid={Boolean(errors.email)}
                {...register("email")}
              />

              {errors.email && (
                <p className="text-xs font-medium text-error">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="label block text-foreground" htmlFor="password">
                رمز عبور
              </label>

              <input
                className="h-12 w-full rounded-token-md border border-border bg-card px-4 text-sm text-foreground shadow-sm transition-colors placeholder:text-muted-foreground focus:border-border-hover focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="رمز عبور"
                aria-invalid={Boolean(errors.password)}
                {...register("password")}
              />

              {errors.password && (
                <p className="text-xs font-medium text-error">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-token-md bg-primary px-5 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              type="submit"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? "در حال ورود..." : "ورود"}
              <ArrowLeft className="size-4" aria-hidden="true" />
            </button>

            {loginMutation.isError && (
              <p className="rounded-token-md border border-error/20 bg-error/5 px-4 py-3 text-sm text-error">
                ورود ناموفق بود. اطلاعات خود را بررسی کنید.
              </p>
            )}
          </form>
        </div>
      </main>
    </section>
  );
}
