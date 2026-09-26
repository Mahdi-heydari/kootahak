"use client";

import Link from "next/link";
import GetIcon from "@/components/ui/Icon";
import Button from "@/components/ui/Button";
import { useCurrentUser } from "@/hooks/auth/use-current-user";
import Profile from "./Profile";

export default function AuthMenu() {
  const { data: user, isLoading } = useCurrentUser();

  if (isLoading) {
    return (
      <div
        className="h-10.5 w-full animate-pulse rounded-token-md bg-muted md:w-28.5"
        aria-hidden="true"
      />
    );
  }

  if (!user) {
    return (
      <Link href="/register" className="w-full md:w-auto">
        <Button variant="outline" size="md" className="w-full md:w-auto">
          ورود | ثبت نام
        </Button>
      </Link>
    );
  }

  return (
    <div className="group relative w-full md:w-auto">
      <button
        type="button"
        aria-label="منوی کاربر"
        className="flex items-center justify-center"
      >
        <GetIcon name="UserRound" size={20} />
      </button>

      <Profile />
    </div>
  );
}
