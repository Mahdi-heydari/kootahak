import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("فرمت ایمیل صحیح نیست"),
  password: z.string().min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد"),
});

const passwordSchema = z
  .string()
  .min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد")
  .regex(/[A-Z]/, "رمز عبور باید حداقل یک حرف بزرگ انگلیسی داشته باشد")
  .regex(/[^A-Za-z0-9]/, "رمز عبور باید حداقل یک کاراکتر خاص داشته باشد")
  .regex(/(?:\D*\d){2}/, "رمز عبور باید حداقل دو عدد داشته باشد");

export const registerSchema = z
  .object({
    name: z.string().min(2, "نام باید حداقل ۲ کاراکتر باشد"),
    email: z.email("فرمت ایمیل صحیح نیست"),
    password: passwordSchema,
    confirmPassword: z.string().min(1, "تکرار رمز عبور الزامی است"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "رمز عبور و تکرار آن یکسان نیستند",
    path: ["confirmPassword"],
  });

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
