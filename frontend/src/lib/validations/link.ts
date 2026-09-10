import { z } from "zod";

export const createLinkSchema = z.object({
  originalUrl: z
    .string()
    .min(1, "آدرس لینک الزامی است")
    .url("آدرس لینک معتبر نیست"),
  title: z.string().max(255, "عنوان حداکثر ۲۵۵ کاراکتر").optional(),
  shortCode: z
    .string()
    .max(20, "نام کوتاه حداکثر ۲۰ کاراکتر")
    .refine((value) => value === "" || /^[a-z0-9-]+$/i.test(value), {
      message: "فقط حروف انگلیسی، عدد و خط تیره",
    })
    .optional(),
});

export type CreateLinkFormValues = z.infer<typeof createLinkSchema>;
