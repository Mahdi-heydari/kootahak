"use client";

import Link from "next/link";
import GetIcon from "@/components/ui/Icon";
import Button from "@/components/ui/Button";
import { useCurrentUser } from "@/hooks/auth/use-current-user";
import { useLogout } from "@/hooks/auth/use-logout";
import { profileContent } from "@/contents/landing";
import UserIdentitySkeleton from "./UserIdentitySkeleton";

export default function Profile() {
  const { data: user, isLoading, isError } = useCurrentUser();
  const logout = useLogout();
  const { menuItems, logoutLabel } = profileContent;

  return (
    <div className="md:absolute left-0 top-[150%] z-50 font-iranyekan text-token-sm transition-all md:invisible md:opacity-0 md:group-hover:visible md:group-hover:opacity-100">
      <div className="w-full overflow-hidden border-border md:w-64 md:rounded-token-sm md:border md:bg-card">
        {/* User header */}
        <div className="flex items-center gap-x-3 border-b border-border ps-4 py-4 md:p-4">
          {isLoading ? (
            <UserIdentitySkeleton />
          ) : isError || !user ? (
            <div className="flex flex-col">
              <span className="text-token-sm font-token-medium text-muted-foreground">
                مهمان
              </span>
              <span className="text-token-xs text-muted-foreground">
                وارد نشده
              </span>
            </div>
          ) : (
            <div className="flex min-w-0 cursor-default flex-col">
              <span className="truncate text-token-sm font-token-medium text-foreground">
                {user.name}
              </span>
              <span className="truncate text-token-xs text-muted-foreground">
                {user.email}
              </span>
            </div>
          )}
        </div>

        {/* Menu items */}
        <div className="p-2">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              rel="noopener noreferrer"
              className="group flex items-center gap-x-3 rounded-token-sm px-3 py-2.5 text-muted-foreground transition-all duration-200 hover:bg-muted/50 hover:text-foreground"
            >
              <GetIcon name={item.icon} size={18} />
              <span className="text-token-sm">{item.label}</span>
            </Link>
          ))}
        </div>

        {/* Logout */}
        {user && (
          <div className="border-t border-border p-3">
            <Button
              onClick={() => logout.mutate()}
              size="md"
              variant="danger"
              isLoading={logout.isPending}
              className="w-full gap-2"
            >
              <GetIcon name="LogOut" size={16} />
              <span className="text-token-sm font-token-medium">
                {logoutLabel}
              </span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
