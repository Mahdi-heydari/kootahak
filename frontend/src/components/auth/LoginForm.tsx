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
import { useLogin } from "@/hooks/use-auth";
import { loginSchema, type LoginFormValues } from "@/lib/validations/auth";

export function LoginForm() {
  const router = useRouter();
  const loginMutation = useLogin();

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
      <div className="space-y-2 mb-8 text-center">
        <div className="flex justify-center items-center gap-2">
          <h2 className="text-2xl font-semibold leading-tight tracking-[-0.03em] md:text-3xl">
            خوش برگشتید به <span className="text-brand">کوتاهک</span>
          </h2>
        </div>
        <p className="body-muted">
          ایمیل و رمز عبور خود را وارد کنید تا به داشبورد کوتاهک بروید.
        </p>
      </div>

      <div className="relative isolate">
        <div className="absolute -top-4 right-1/2 left-1/2 translate-x-1/2 mx-auto bg-brand w-3/4 h-25 rounded-xl -z-10"></div>
        <div className="space-y-8 dark:bg-background bg-primary-foreground p-7 shadow-token-md">
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

        <div className="flex items-baseline gap-1.5">
          <span className="block w-2 h-2 bg-brand" />
          <p className="text-muted-foreground text-sm font-token-normal select-none mt-6">
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
