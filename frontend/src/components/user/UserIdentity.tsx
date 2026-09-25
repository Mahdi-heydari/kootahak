"use client";

import { useCurrentUser } from "@/hooks/auth/use-current-user";
import UserIdentitySkeleton from "./UserIdentitySkeleton";

export default function UserIdentity() {
  const { data: user, isLoading, isError } = useCurrentUser();

  if (isLoading) {
    return <UserIdentitySkeleton />;
  }

  if (isError || !user) {
    return (
      <div className="flex flex-col text-token-sm">
        <span className="select-none font-token-semibold text-muted-foreground">
          مهمان
        </span>
        <span className="font-token-normal text-muted-foreground">
          وارد نشده
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <span className="max-w-28 truncate font-token-semibold text-token-sm select-none">
        {user.name}
      </span>
      <span className="max-w-36 truncate font-token-normal text-token-xs text-muted-foreground">
        {user.email}
      </span>
    </div>
  );
}
