import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("فرمت ایمیل صحیح نیست"),
  password: z
    .string("رمز عبور الزامی است")
    .min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد"),
});

export const registerSchema = z.object({
  name: z
    .string("نام الزامی است")
    .min(1, "نام الزامی است"),

  email: z.email("فرمت ایمیل صحیح نیست"),

  password: z
    .string("رمز عبور الزامی است")
    .min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;