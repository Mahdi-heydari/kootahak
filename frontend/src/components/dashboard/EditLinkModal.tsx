"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import GetIcon from "@/components/ui/Icon";

import Button from "@/components/ui/Button";
import {
  updateLinkSchema,
  type UpdateLinkFormValues,
} from "@/lib/validations/link";
import type { Link } from "@/types/links";

const inputClassName =
  "h-12 w-full rounded-token-md border border-border bg-card px-4 text-token-sm text-foreground shadow-token-sm transition-colors duration-token-normal placeholder:text-muted-foreground focus:border-brand/30 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60";

interface EditLinkModalProps {
  open: boolean;
  link: Link | null;
  onClose: () => void;
  onSubmit: (data: UpdateLinkFormValues) => void;
  /** کدهای کوتاه سایر لینک‌ها (بدون خود این لینک) برای بررسی تکراری نبودن */
  existingShortCodes: string[];
}

export default function EditLinkModal({
  open,
  link,
  onClose,
  onSubmit,
  existingShortCodes,
}: EditLinkModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<UpdateLinkFormValues>({
    resolver: zodResolver(updateLinkSchema),
    defaultValues: {
      originalUrl: "",
      title: "",
      shortCode: "",
    },
  });

  // هر وقت مودال باز شد یا لینک عوض شد، فرم را با مقادیر لینک پر کن
  useEffect(() => {
    if (!open || !link) return;

    reset({
      originalUrl: link.originalUrl,
      title: link.title,
      shortCode: link.shortCode,
    });
  }, [open, link, reset]);

  // بستن با Escape
  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  const handleFormSubmit = (data: UpdateLinkFormValues) => {
    const shortCode = data.shortCode?.trim().toLowerCase();

    if (shortCode && existingShortCodes.includes(shortCode)) {
      setError("shortCode", { message: "این نام کوتاه قبلاً استفاده شده" });
      return;
    }

    onSubmit({
      ...data,
      shortCode,
    });
    onClose();
  };

  if (!open || !link) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-4"
      onClick={onClose}
    >
      <div
        className="surface max-h-[92dvh] w-full overflow-y-auto rounded-t-token-xl p-5 shadow-token-md scrollbar-thin sm:max-w-lg sm:rounded-token-xl sm:p-6"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-link-title"
      >
        <div className="mb-6 flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-token-lg bg-brand/10 text-brand">
              <GetIcon name="Pencil" className="size-5" />
            </div>
            <div>
              <h2 id="edit-link-title" className="h3">
                ویرایش لینک
              </h2>
              <p className="mt-1 text-token-sm text-muted-foreground">
                اطلاعات لینک را ویرایش کنید
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex size-11 shrink-0 items-center justify-center rounded-token-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="بستن"
          >
            <GetIcon name="X" className="size-5" />
          </button>
        </div>

        <form
          className="space-y-4"
          onSubmit={handleSubmit(handleFormSubmit)}
          noValidate
        >
          <div className="space-y-2">
            <label
              className="label block text-foreground"
              htmlFor="edit-originalUrl"
            >
              آدرس اصلی
            </label>
            <input
              id="edit-originalUrl"
              type="url"
              dir="ltr"
              placeholder="https://example.com/page"
              autoComplete="url"
              className={inputClassName}
              aria-invalid={Boolean(errors.originalUrl)}
              {...register("originalUrl")}
            />
            {errors.originalUrl && (
              <p className="text-token-xs font-token-medium text-error">
                {errors.originalUrl.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="label block text-foreground" htmlFor="edit-title">
              عنوان <span className="text-muted-foreground">(اختیاری)</span>
            </label>
            <input
              id="edit-title"
              type="text"
              placeholder="مثلاً لندینگ محصول"
              className={inputClassName}
              aria-invalid={Boolean(errors.title)}
              {...register("title")}
            />
            {errors.title && (
              <p className="text-token-xs font-token-medium text-error">
                {errors.title.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label
              className="label block text-foreground"
              htmlFor="edit-shortCode"
            >
              نام کوتاه
            </label>
            <div className="flex items-center gap-2">
              <span
                className="shrink-0 text-token-sm text-muted-foreground"
                dir="ltr"
              >
                kootahak.ir/
              </span>
              <input
                id="edit-shortCode"
                type="text"
                dir="ltr"
                placeholder="my-link"
                className={inputClassName}
                aria-invalid={Boolean(errors.shortCode)}
                {...register("shortCode")}
              />
            </div>
            {errors.shortCode && (
              <p className="text-token-xs font-token-medium text-error">
                {errors.shortCode.message}
              </p>
            )}
          </div>

          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
            <Button type="button" variant="outline" size="sm" onClick={onClose}>
              انصراف
            </Button>
            <Button type="submit" size="sm" isLoading={isSubmitting}>
              ذخیره تغییرات
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
