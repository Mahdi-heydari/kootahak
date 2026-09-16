"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import GetIcon from "@/components/ui/Icon";
import { useRouter } from "next/navigation";

import { AuthLayout } from "@/components/auth/AuthLayout";
import Button from "@/components/ui/Button";
import {
  authErrorClassName,
  authFooterClassName,
  authFooterLinkClassName,
  authInputClassName,
} from "@/lib/auth-input";
import { useLogin } from "@/hooks/use-auth";
import { loginSchema, type LoginFormValues } from "@/lib/validations/auth";

export function LoginForm() {
  const router = useRouter();
  const loginMutation = useLogin();
  const [showPassword, setShowPassword] = useState(false);

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
    <AuthLayout
      eyebrow="مدیریت لینک‌ها"
      title="سریع وارد شوید و لینک‌های کوتاه خود را مدیریت کنید"
      description="پنل کوتاهک برای ساخت، پیگیری و مدیریت لینک‌ها طراحی شده تا مسیرهای مهم شما همیشه مرتب و قابل اندازه‌گیری بمانند."
    >
      <div className="mb-8 space-y-2 text-center">
        <div className="flex items-center justify-center gap-2">
          <h2 className="text-token-2xl font-token-semibold leading-token-tight tracking-token-tight md:text-token-3xl">
            خوش برگشتید به <span className="text-brand">کوتاهک</span>
          </h2>
        </div>
        <p className="text-token-sm leading-token-relaxed text-muted-foreground">
          ایمیل و رمز عبور خود را وارد کنید تا به داشبورد کوتاهک بروید.
        </p>
      </div>

      <div className="relative isolate">
        <div className="absolute -top-4 left-1/2 right-1/2 -z-10 mx-auto h-25 w-3/4 translate-x-1/2 rounded-token-xl bg-brand" />

        <div className="space-y-8 bg-primary-foreground p-7 shadow-token-md dark:bg-background">
          <form
            className="space-y-5"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <div className="space-y-2">
              <label
                className="block text-token-sm font-token-medium text-muted-foreground"
                htmlFor="email"
              >
                ایمیل
              </label>
              <input
                className={authInputClassName}
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                aria-invalid={Boolean(errors.email)}
                {...register("email")}
              />

              {errors.email && (
                <p className={authErrorClassName}>{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label
                className="block text-token-sm font-token-medium text-muted-foreground"
                htmlFor="password"
              >
                رمز عبور
              </label>
              <div className="relative">
                <input
                  className={`${authInputClassName} pl-10`}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  // placeholder="رمز عبور"
                  aria-invalid={Boolean(errors.password)}
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={
                    showPassword ? "پنهان کردن رمز عبور" : "نمایش رمز عبور"
                  }
                  aria-pressed={showPassword}
                  className="absolute inset-y-0 left-3 flex items-center text-muted-foreground transition-colors hover:text-foreground"
                  tabIndex={-1}
                >
                  <GetIcon
                    name={showPassword ? "EyeOff" : "Eye"}
                    className="size-4"
                  />
                </button>
              </div>

              {errors.password && (
                <p className={authErrorClassName}>{errors.password.message}</p>
              )}
            </div>

            <Button
              type="submit"
              fullWidth
              disabled={loginMutation.isPending}
              className="gap-2"
            >
              {loginMutation.isPending ? "در حال ورود..." : "ورود"}
              <GetIcon name="ArrowLeft" className="size-4" aria-hidden="true" />
            </Button>

            {loginMutation.isError && (
              <p className="rounded-token-md border border-error/20 bg-error/5 px-4 py-3 text-token-sm text-error">
                ورود ناموفق بود. اطلاعات خود را بررسی کنید.
              </p>
            )}
          </form>

          <div className={authFooterClassName}>
            حساب کاربری ندارید؟
            <Link className={authFooterLinkClassName} href="/register">
              ایجاد حساب جدید
            </Link>
          </div>
        </div>

        <div className="flex items-baseline gap-1.5">
          <span className="block size-2 bg-brand" />
          <p className="mt-6 select-none text-token-sm font-token-normal text-muted-foreground">
            ورود شما به معنای پذیرش{" "}
            <a href="#" className="text-brand underline">
              قوانین
            </a>{" "}
            و شرایط کوتاهک است .
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}
