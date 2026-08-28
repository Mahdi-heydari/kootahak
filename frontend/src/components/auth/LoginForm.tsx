"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema } from "@/lib/validations/auth";
import { useLogin } from "@/hooks/use-auth";

import type { LoginFormValues } from "@/lib/validations/auth";

export function LoginForm() {
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    loginMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="email">ایمیل</label>

        <input
          id="email"
          type="email"
          {...register("email")}
        />

        {errors.email && (
          <p>{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="password">رمز عبور</label>

        <input
          id="password"
          type="password"
          {...register("password")}
        />

        {errors.password && (
          <p>{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loginMutation.isPending}
      >
        {loginMutation.isPending ? "در حال ورود..." : "ورود"}
      </button>

      {loginMutation.isError && (
        <p>
          ورود ناموفق بود. اطلاعات خود را بررسی کنید.
        </p>
      )}
    </form>
  );
}