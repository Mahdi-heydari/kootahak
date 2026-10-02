"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/components/ui/Button";

const profileSchema = z.object({
  name: z.string().min(2, "نام حداقل ۲ کاراکتر"),
  email: z.string().email("ایمیل معتبر نیست"),
});

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "رمز فعلی الزامی است"),
    newPassword: z.string().min(8, "رمز جدید حداقل ۸ کاراکتر"),
    confirmPassword: z.string(),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    message: "رمز جدید و تکرار آن یکسان نیستند",
    path: ["confirmPassword"],
  });

type ProfileForm = z.infer<typeof profileSchema>;
type PasswordForm = z.infer<typeof passwordSchema>;

const inputClassName =
  "h-12 w-full rounded-token-md border border-border bg-card px-4 text-token-sm text-foreground shadow-token-sm transition-colors duration-token-normal placeholder:text-muted-foreground focus:border-border-hover focus:outline-none disabled:cursor-not-allowed disabled:opacity-60";

export default function SettingsPage() {
  const profileForm = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: "", email: "" },
  });

  const passwordForm = useForm<PasswordForm>({
    resolver: zodResolver(passwordSchema),
  });

  return (
    <div className="mx-auto max-w-2xl space-y-8 p-4 sm:space-y-10 sm:p-6">
      <div>
        <h1 className="h2">تنظیمات</h1>
        <p className="mt-1 text-token-sm text-muted-foreground">
          مدیریت پروفایل و امنیت حساب
        </p>
      </div>

      {/* اطلاعات حساب */}
      <section className="surface rounded-token-xl p-6 shadow-token-sm">
        <h2 className="h3">اطلاعات حساب</h2>
        <form
          onSubmit={profileForm.handleSubmit((data) => {
            console.log("profile", data);
          })}
          className="mt-4 space-y-4"
          noValidate
        >
          <div className="space-y-2">
            <label className="label block text-foreground" htmlFor="name">
              نام
            </label>
            <input
              id="name"
              {...profileForm.register("name")}
              className={inputClassName}
              aria-invalid={Boolean(profileForm.formState.errors.name)}
            />
            {profileForm.formState.errors.name && (
              <p className="text-token-xs font-token-medium text-error">
                {profileForm.formState.errors.name.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <label className="label block text-foreground" htmlFor="email">
              ایمیل
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              {...profileForm.register("email")}
              className={inputClassName}
              aria-invalid={Boolean(profileForm.formState.errors.email)}
            />
            {profileForm.formState.errors.email && (
              <p className="text-token-xs font-token-medium text-error">
                {profileForm.formState.errors.email.message}
              </p>
            )}
          </div>
          <Button type="submit" size="sm">
            ذخیره تغییرات
          </Button>
        </form>
      </section>

      {/* تغییر رمز */}
      <section className="surface rounded-token-xl p-6 shadow-token-sm">
        <h2 className="h3">تغییر رمز عبور</h2>
        <form
          onSubmit={passwordForm.handleSubmit((data) => {
            console.log("password", data);
          })}
          className="mt-4 space-y-4"
          noValidate
        >
          <div className="space-y-2">
            <label
              className="label block text-foreground"
              htmlFor="currentPassword"
            >
              رمز فعلی
            </label>
            <input
              id="currentPassword"
              type="password"
              autoComplete="current-password"
              {...passwordForm.register("currentPassword")}
              className={inputClassName}
            />
          </div>
          <div className="space-y-2">
            <label
              className="label block text-foreground"
              htmlFor="newPassword"
            >
              رمز جدید
            </label>
            <input
              id="newPassword"
              type="password"
              autoComplete="new-password"
              {...passwordForm.register("newPassword")}
              className={inputClassName}
            />
          </div>
          <div className="space-y-2">
            <label
              className="label block text-foreground"
              htmlFor="confirmPassword"
            >
              تکرار رمز جدید
            </label>
            <input
              id="confirmPassword"
              type="password"
              autoComplete="new-password"
              {...passwordForm.register("confirmPassword")}
              className={inputClassName}
              aria-invalid={Boolean(
                passwordForm.formState.errors.confirmPassword,
              )}
            />
            {passwordForm.formState.errors.confirmPassword && (
              <p className="text-token-xs font-token-medium text-error">
                {passwordForm.formState.errors.confirmPassword.message}
              </p>
            )}
          </div>
          <Button type="submit" size="sm">
            تغییر رمز
          </Button>
        </form>
      </section>
    </div>
  );
}
