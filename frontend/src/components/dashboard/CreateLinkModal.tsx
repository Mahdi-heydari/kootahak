"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import GetIcon from "@/components/ui/Icon";

import Button from "@/components/ui/Button";
import { readUrlFromClipboard } from "@/lib/dashboard/clipboard-url";
import {
  createLinkSchema,
  type CreateLinkFormValues,
} from "@/lib/validations/link";

const inputClassName =
  "h-12 w-full rounded-token-md border border-border bg-card px-4 text-token-sm text-foreground shadow-token-sm transition-colors duration-token-normal placeholder:text-muted-foreground focus:border-brand/30 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60";

interface CreateLinkModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CreateLinkFormValues) => void;
  existingShortCodes: string[];
}

export default function CreateLinkModal({
  open,
  onClose,
  onSubmit,
  existingShortCodes,
}: CreateLinkModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<CreateLinkFormValues>({
    resolver: zodResolver(createLinkSchema),
    defaultValues: {
      originalUrl: "",
      title: "",
      shortCode: "",
    },
  });

  useEffect(() => {
    if (!open) return;

    reset({
      originalUrl: "",
      title: "",
      shortCode: "",
    });

    readUrlFromClipboard().then((url) => {
      if (url) {
        setValue("originalUrl", url, { shouldValidate: true });
      }
    });
  }, [open, reset, setValue]);

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

  const handlePasteFromClipboard = async () => {
    const url = await readUrlFromClipboard();
    if (url) {
      setValue("originalUrl", url, { shouldValidate: true, shouldDirty: true });
    }
  };

  const handleFormSubmit = (data: CreateLinkFormValues) => {
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

  if (!open) return null;

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
        aria-labelledby="create-link-title"
      >
        <div className="mb-6 flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-token-lg bg-brand/10 text-brand">
              <GetIcon name="Link2" className="size-5" />
            </div>
            <div>
              <h2 id="create-link-title" className="h3">
                لینک جدید
              </h2>
              <p className="mt-1 text-token-sm text-muted-foreground">
                لینک بلند را وارد کنید تا کوتاه شود
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
            <div className="flex items-center justify-between gap-2">
              <label
                className="label block text-foreground"
                htmlFor="originalUrl"
              >
                آدرس اصلی
              </label>
              <button
                type="button"
                onClick={handlePasteFromClipboard}
                className="inline-flex items-center gap-1.5 text-token-xs font-token-medium text-brand transition-colors hover:text-brand/80"
              >
                <GetIcon name="ClipboardPaste" className="size-3.5" />
                چسباندن از کلیپ‌بورد
              </button>
            </div>

            <input
              id="originalUrl"
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
            <label className="label block text-foreground" htmlFor="title">
              عنوان <span className="text-muted-foreground">(اختیاری)</span>
            </label>
            <input
              id="title"
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
            <label className="label block text-foreground" htmlFor="shortCode">
              نام کوتاه <span className="text-muted-foreground">(اختیاری)</span>
            </label>
            <div className="flex items-center gap-2">
              <span
                className="shrink-0 text-token-sm text-muted-foreground"
                dir="ltr"
              >
                kootahak.ir/
              </span>
              <input
                id="shortCode"
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
              ساخت لینک
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
