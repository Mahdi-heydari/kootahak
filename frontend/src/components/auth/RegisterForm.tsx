"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, UserPlus } from "lucide-react";

import { AuthLayout } from "@/components/auth/AuthLayout";
import { useRegister } from "@/hooks/use-auth";
import {
  registerSchema,
  type RegisterFormValues,
} from "@/lib/validations/auth";

export function RegisterForm() {
  const router = useRouter();
  const registerMutation = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: RegisterFormValues) => {
    const payload = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    registerMutation.mutate(payload, {
      onSuccess: () => {
        router.push("/dashboard");
      },
    });
  };

  return (
    <AuthLayout
      eyebrow="شروع سریع"
      title="حساب کوتاهک خود را بسازید و لینک‌ها را حرفه‌ای‌تر مدیریت کنید"
      description="با ساخت حساب، لینک‌های کوتاه خود را در یک داشبورد منظم نگه می‌دارید و برای رشد مسیرهای مهمتان آماده می‌شوید."
    >
      <div className="space-y-8">
        <div className="space-y-3">
          <div className="flex size-12 items-center justify-center rounded-token-lg bg-muted text-foreground">
            <UserPlus className="size-5" aria-hidden="true" />
          </div>
          <div className="space-y-2">
            <p className="label">ایجاد حساب</p>
            <h2 className="text-3xl font-semibold leading-tight">
              به کوتاهک خوش آمدید
            </h2>
            <p className="body-muted">
              مشخصات خود را وارد کنید تا حساب شما ساخته شود و وارد داشبورد شوید.
            </p>
          </div>
        </div>

        <form
          className="space-y-5"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className="space-y-2">
            <label className="label block text-foreground" htmlFor="name">
              نام
            </label>
            <input
              className="h-12 w-full rounded-token-md border border-border bg-card px-4 text-sm text-foreground shadow-sm transition-colors placeholder:text-muted-foreground focus:border-border-hover focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
              id="name"
              autoComplete="name"
              placeholder="نام شما"
              aria-invalid={Boolean(errors.name)}
              {...register("name")}
            />

            {errors.name && (
              <p className="text-xs font-medium text-error">
                {errors.name.message}
              </p>
            )}
          </div>

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

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="label block text-foreground" htmlFor="password">
                رمز عبور
              </label>
              <input
                className="h-12 w-full rounded-token-md border border-border bg-card px-4 text-sm text-foreground shadow-sm transition-colors placeholder:text-muted-foreground focus:border-border-hover focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
                id="password"
                type="password"
                autoComplete="new-password"
                placeholder="حداقل ۶ کاراکتر"
                aria-invalid={Boolean(errors.password)}
                {...register("password")}
              />

              {errors.password && (
                <p className="text-xs font-medium text-error">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label
                className="label block text-foreground"
                htmlFor="confirmPassword"
              >
                تکرار رمز عبور
              </label>
              <input
                className="h-12 w-full rounded-token-md border border-border bg-card px-4 text-sm text-foreground shadow-sm transition-colors placeholder:text-muted-foreground focus:border-border-hover focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
                id="confirmPassword"
                type="password"
                autoComplete="new-password"
                placeholder="تکرار رمز"
                aria-invalid={Boolean(errors.confirmPassword)}
                {...register("confirmPassword")}
              />

              {errors.confirmPassword && (
                <p className="text-xs font-medium text-error">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          <button
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-token-md bg-primary px-5 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            type="submit"
            disabled={registerMutation.isPending}
          >
            {registerMutation.isPending ? "در حال ثبت‌نام..." : "ساخت حساب"}
            <ArrowLeft className="size-4" aria-hidden="true" />
          </button>

          {registerMutation.isError && (
            <p className="rounded-token-md border border-error/20 bg-error/5 px-4 py-3 text-sm text-error">
              ثبت‌نام انجام نشد. اطلاعات واردشده را بررسی کنید.
            </p>
          )}
        </form>

        <div className="flex items-center justify-center gap-2 rounded-token-md border border-border bg-background-secondary px-4 py-3 text-sm text-muted-foreground">
          قبلا حساب ساخته‌اید؟
          <Link
            className="font-medium text-foreground transition-colors hover:text-muted-foreground"
            href="/login"
          >
            ورود به حساب
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
