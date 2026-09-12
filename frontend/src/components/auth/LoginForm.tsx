"use client";

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
    <AuthLayout
      eyebrow="مدیریت لینک‌ها"
      title="سریع وارد شوید و لینک‌های کوتاه خود را مدیریت کنید"
      description="پنل کوتاهک برای ساخت، پیگیری و مدیریت لینک‌ها طراحی شده تا مسیرهای مهم شما همیشه مرتب و قابل اندازه‌گیری بمانند."
    >
      <div className="space-y-8">
        <div className="space-y-3">
          <div className="flex size-12 items-center justify-center rounded-token-lg bg-brand/10 text-brand">
            <GetIcon name="LockKeyhole" className="size-5" aria-hidden="true" />
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
            <label className="label block text-foreground" htmlFor="password">
              رمز عبور
            </label>

            <input
              className={authInputClassName}
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="رمز عبور"
              aria-invalid={Boolean(errors.password)}
              {...register("password")}
            />

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
    </AuthLayout>
  );
}
