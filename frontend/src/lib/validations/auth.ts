import { z } from "zod";

const SPECIAL_CHARS_REGEX = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]/;
const ENGLISH_ONLY_REGEX = /^[A-Za-z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]+$/;

export const PASSWORD_MESSAGES = {
  length: "حداقل 6 کاراکتر باشد",
  uppercase: "حداقل یک حرف بزرگ انگلیسی داشته باشد",
  special: "حداقل یک کاراکتر خاص داشته باشد",
  digits: "حداقل دو عدد داشته باشد",
  englishOnly: "فقط شامل حروف و اعداد انگلیسی باشد",
} as const;

export const passwordSchema = z
  .string()
  .trim()
  .min(6, PASSWORD_MESSAGES.length)
  .regex(ENGLISH_ONLY_REGEX, PASSWORD_MESSAGES.englishOnly)
  .regex(/[A-Z]/, PASSWORD_MESSAGES.uppercase)
  .regex(SPECIAL_CHARS_REGEX, PASSWORD_MESSAGES.special)
  .regex(/(?:\D*\d){2}/, PASSWORD_MESSAGES.digits);

export const loginSchema = z.object({
  email: z.email("فرمت ایمیل صحیح نیست").trim().toLowerCase(),
  password: z.string().min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد").trim(),
});

export const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(5, "نام باید حداقل 5 کاراکتر باشد")
      .max(50, "نام نباید بیشتر از ۵۰ کاراکتر باشد"),

    email: z.email("فرمت ایمیل صحیح نیست").trim().toLowerCase(),

    password: passwordSchema,

    confirmPassword: z.string().trim().min(1, "تکرار رمز عبور الزامی است"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "رمز عبور و تکرار آن یکسان نیستند",
    path: ["confirmPassword"],
  });

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
