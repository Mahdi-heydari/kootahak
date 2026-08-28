import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("فرمت ایمیل صحیح نیست"),
  password: z
    .string()
    .min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد"),
});

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, "نام باید حداقل ۲ کاراکتر باشد"),

    email: z.email("فرمت ایمیل صحیح نیست"),

    password: z
      .string()
      .min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد"),

    confirmPassword: z
      .string()
      .min(6, "تکرار رمز عبور الزامی است"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "رمز عبور و تکرار آن یکسان نیستند",
    path: ["confirmPassword"],
  });

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;