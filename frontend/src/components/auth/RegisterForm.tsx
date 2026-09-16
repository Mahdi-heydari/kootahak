"use client";

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
      <div className="space-y-2 mb-8 text-center">
        <div className="flex justify-center items-center gap-2">
          <h2 className="text-2xl font-semibold leading-tight tracking-[-0.03em] md:text-3xl">
            به <span className="text-brand">کوتاهک</span> خوش آمدید
          </h2>
        </div>
        <p className="body-muted">
          مشخصات خود را وارد کنید تا حساب شما ساخته شود و وارد داشبورد شوید.
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
              <label className="label block text-foreground" htmlFor="name">
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

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <label
                  className="label block text-foreground"
                  htmlFor="password"
                >
                  رمز عبور
                </label>
                <input
                  className={authInputClassName}
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  aria-invalid={Boolean(errors.password)}
                  {...register("password")}
                />
              </div>

              <div className="space-y-2">
                <label
                  className="label block text-foreground"
                  htmlFor="confirmPassword"
                >
                  تکرار رمز عبور
                </label>
                <input
                  className={authInputClassName}
                  id="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  aria-invalid={Boolean(errors.confirmPassword)}
                  {...register("confirmPassword")}
                />

                {errors.confirmPassword && (
                  <p className={authErrorClassName}>
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            <div className="w-full text-foreground text-token-xs">
              <div className="grid grid-cols-2 gap-y-3">
                {passwordRules.map((rule) => (
                  <div
                    key={`${rule.label}-${submitCount}`}
                    className={`flex items-start gap-[10px] leading-[1.45] transition-colors ${
                      rule.valid ? "text-[#16c95a]" : "text-[#777]"
                    } ${!rule.valid && errors.password ? "animate-shake" : ""}`}
                  >
                    <GetIcon
                      name={rule.valid ? "CircleCheck" : "Circle"}
                      size={18}
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
          <span className="block w-2 h-2 bg-brand" />
          <p className="text-muted-foreground text-sm font-token-normal select-none mt-6">
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
