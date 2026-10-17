import { z } from "zod";

const SHORT_CODE_PATTERN = /^[a-zA-Z0-9_-]+$/;

const originalUrlSchema = z
  .string()
  .trim()
  .min(1, "لینک ورودی الزامی است")
  .max(2048, "لینک باید حداکثر ۲۰۴۸ کاراکتر باشد")
  .refine((value) => {
    try {
      const url = new URL(value);
      return url.protocol === "http:" || url.protocol === "https:";
    } catch {
      return false;
    }
  }, "لینک باید با http:// یا https:// شروع شود");

const titleSchema = z
  .string()
  .trim()
  .min(1, "عنوان الزامی است")
  .max(255, "عنوان باید حداکثر ۲۵۵ کاراکتر باشد");

const shortCodeSchema = z
  .string()
  .trim()
  .min(4, "کد کوتاه باید حداقل ۴ کاراکتر باشد")
  .max(20, "کد کوتاه باید حداکثر ۲۰ کاراکتر باشد")
  .regex(
    SHORT_CODE_PATTERN,
    "کد کوتاه فقط می‌تواند شامل حروف، عدد، خط تیره و آندرلاین باشد",
  );

const optionalShortCodeSchema = z
  .string()
  .trim()
  .refine(
    (value) => value === "" || shortCodeSchema.safeParse(value).success,
    "کد پیشنهادی باید ۴ تا ۲۰ کاراکتر و فقط شامل حروف، عدد، خط تیره و آندرلاین باشد",
  );

const optionalExpiresAtSchema = z
  .string()
  .trim()
  .refine((value) => {
    if (value === "") return true;
    return !Number.isNaN(new Date(value).getTime());
  }, "تاریخ انقضا باید در قالب معتبر تاریخ باشد");

export const createLinkSchema = z.object({
  originalUrl: originalUrlSchema,
  title: titleSchema,
  suggestedCode: optionalShortCodeSchema,
  expiresAt: optionalExpiresAtSchema,
});

export type CreateLinkFormValues = z.infer<typeof createLinkSchema>;

export const updateLinkSchema = z.object({
  originalUrl: originalUrlSchema,
  title: titleSchema,
  shortCode: shortCodeSchema,
  expiresAt: optionalExpiresAtSchema,
});

export type UpdateLinkFormValues = z.infer<typeof updateLinkSchema>;
