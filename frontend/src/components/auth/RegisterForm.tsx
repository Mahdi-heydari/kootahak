"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import GetIcon from "@/components/ui/Icon";

import { AuthLayout } from "@/components/auth/AuthLayout";
import Button from "@/components/ui/Button";
import {
  authErrorClassName,
  authFooterClassName,
  authFooterLinkClassName,
  authInputClassName,
} from "@/lib/auth-input";
import { useRegister } from "@/hooks/use-auth";
import {
  registerSchema,
  type RegisterFormValues,
} from "@/lib/validations/auth";

export function RegisterForm() {
  const router = useRouter();
  const registerMutation = useRegister();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, submitCount },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = useWatch({ control, name: "password" }) ?? "";

  const passwordRules = [
    { label: "حداقل ۸ کاراکتر", valid: password.length >= 8 },
    { label: "حداقل یک حرف بزرگ انگلیسی", valid: /[A-Z]/.test(password) },
    { label: "حداقل یک کاراکتر خاص", valid: /[^A-Za-z0-9]/.test(password) },
    {
      label: "حداقل دو عدد",
      valid: (password.match(/\d/g) ?? []).length >= 2,
    },
  ];

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
      <div className="mb-8 space-y-2 text-center">
        <div className="flex items-center justify-center gap-2">
          <h2 className="text-token-2xl font-token-semibold leading-token-tight tracking-token-tight md:text-token-3xl">
            به <span className="text-brand">کوتاهک</span> خوش آمدید
          </h2>
        </div>
        <p className="text-token-sm leading-token-relaxed text-muted-foreground">
          مشخصات خود را وارد کنید تا حساب شما ساخته شود و وارد داشبورد شوید.
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
                htmlFor="name"
              >
                نام
              </label>
              <input
                className={authInputClassName}
                id="name"
                autoComplete="name"
                placeholder="نام شما"
                aria-invalid={Boolean(errors.name)}
                {...register("name")}
              />

              {errors.name && (
                <p className={authErrorClassName}>{errors.name.message}</p>
              )}
            </div>

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

            <div className="grid gap-5 sm:grid-cols-2">
              {/* رمز عبور */}
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
                    autoComplete="new-password"
                    aria-invalid={Boolean(errors.password)}
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={
                      showPassword ? "پنهان کردن رمز عبور" : "نمایش رمز عبور"
                    }
                    title={
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
              </div>

              {/* تکرار رمز عبور */}
              <div className="space-y-2">
                <label
                  className="block text-token-sm font-token-medium text-muted-foreground"
                  htmlFor="confirmPassword"
                >
                  تکرار رمز عبور
                </label>
                <div className="relative">
                  <input
                    className={`${authInputClassName} pl-10`}
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    aria-invalid={Boolean(errors.confirmPassword)}
                    {...register("confirmPassword")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((v) => !v)}
                    aria-label={
                      showConfirmPassword
                        ? "پنهان کردن رمز عبور"
                        : "نمایش رمز عبور"
                    }
                    title={
                      showConfirmPassword
                        ? "پنهان کردن رمز عبور"
                        : "نمایش رمز عبور"
                    }
                    aria-pressed={showConfirmPassword}
                    className="absolute inset-y-0 left-3 flex items-center text-muted-foreground transition-colors hover:text-foreground"
                    tabIndex={-1}
                  >
                    <GetIcon
                      name={showConfirmPassword ? "EyeOff" : "Eye"}
                      className="size-4"
                    />
                  </button>
                </div>

                {errors.confirmPassword && (
                  <p className={authErrorClassName}>
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            <div className="w-full text-token-xs text-foreground">
              <div className="grid grid-cols-1 gap-y-3 sm:grid-cols-2">
                {passwordRules.map((rule) => (
                  <div
                    key={`${rule.label}-${submitCount}`}
                    className={`flex items-start gap-2.5 leading-token-snug transition-colors ${
                      rule.valid ? "text-success" : "text-muted-foreground"
                    } ${!rule.valid && errors.password ? "animate-shake" : ""}`}
                  >
                    <GetIcon
                      name={rule.valid ? "CircleCheck" : "Circle"}
                      size={18}
                      aria-hidden="true"
                    />
                    <span>{rule.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <Button
              type="submit"
              fullWidth
              disabled={registerMutation.isPending}
              className="gap-2"
            >
              {registerMutation.isPending ? "در حال ثبت‌نام..." : "ساخت حساب"}
              <GetIcon name="ArrowLeft" className="size-4" aria-hidden="true" />
            </Button>

            {registerMutation.isError && (
              <p className="rounded-token-md border border-error/20 bg-error/5 px-4 py-3 text-token-sm text-error">
                ثبت‌نام انجام نشد. اطلاعات واردشده را بررسی کنید.
              </p>
            )}
          </form>

          <div className={authFooterClassName}>
            قبلا حساب ساخته‌اید؟
            <Link className={authFooterLinkClassName} href="/login">
              ورود به حساب
            </Link>
          </div>
        </div>

        <div className="flex items-baseline gap-1.5">
          <span className="block size-2 bg-brand" />
          <p className="mt-6 select-none text-token-sm font-token-normal text-muted-foreground">
            عضویت شما در سایت به منظور پذیرفتن{" "}
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
