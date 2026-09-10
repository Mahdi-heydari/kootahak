"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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

export default function SettingsPage() {
  const profileForm = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: "", email: "" },
  });

  const passwordForm = useForm<PasswordForm>({
    resolver: zodResolver(passwordSchema),
  });

  return (
    <div className="mx-auto max-w-2xl space-y-10 p-6">
      <div>
        <h1 className="text-2xl font-bold">تنظیمات</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          مدیریت پروفایل و امنیت حساب
        </p>
      </div>

      {/* اطلاعات حساب */}
      <section className="rounded-2xl border p-6 space-y-4">
        <h2 className="font-semibold">اطلاعات حساب</h2>
        <form onSubmit={profileForm.handleSubmit((data) => { console.log("profile", data); })} className="space-y-4">
          <div>
            <label className="text-sm">نام</label>
            <input {...profileForm.register("name")} className="mt-1 w-full rounded-lg border bg-background px-3 py-2" />
            {profileForm.formState.errors.name && <p className="mt-1 text-sm text-red-500">{profileForm.formState.errors.name.message}</p>}
          </div>
          <div>
            <label className="text-sm">ایمیل</label>
            <input type="email" {...profileForm.register("email")} className="mt-1 w-full rounded-lg border bg-background px-3 py-2" />
            {profileForm.formState.errors.email && <p className="mt-1 text-sm text-red-500">{profileForm.formState.errors.email.message}</p>}
          </div>
          <button type="submit" className="rounded-lg bg-primary px-4 py-2 text-primary-foreground">ذخیره تغییرات</button>
        </form>
      </section>

      {/* تغییر رمز */}
      <section className="rounded-2xl border p-6 space-y-4">
        <h2 className="font-semibold">تغییر رمز عبور</h2>
        <form onSubmit={passwordForm.handleSubmit((data) => { console.log("password", data); })} className="space-y-4">
          <div>
            <label className="text-sm">رمز فعلی</label>
            <input type="password" {...passwordForm.register("currentPassword")} className="mt-1 w-full rounded-lg border bg-background px-3 py-2" />
          </div>
          <div>
            <label className="text-sm">رمز جدید</label>
            <input type="password" {...passwordForm.register("newPassword")} className="mt-1 w-full rounded-lg border bg-background px-3 py-2" />
          </div>
          <div>
            <label className="text-sm">تکرار رمز جدید</label>
            <input type="password" {...passwordForm.register("confirmPassword")} className="mt-1 w-full rounded-lg border bg-background px-3 py-2" />
            {passwordForm.formState.errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{passwordForm.formState.errors.confirmPassword.message}</p>}
          </div>
          <button type="submit" className="rounded-lg bg-primary px-4 py-2 text-primary-foreground">تغییر رمز</button>
        </form>
      </section>
    </div>
  );
}
