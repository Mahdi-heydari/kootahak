import type { AuthUser } from "@/types/auth";

const AUTH_USER_KEY = "kootahak.auth.user";

function isAuthUser(value: unknown): value is AuthUser {
  if (!value || typeof value !== "object") return false;

  const user = value as Partial<AuthUser>;
  return (
    typeof user.id === "number" &&
    typeof user.name === "string" &&
    typeof user.email === "string"
  );
}

export function getStoredUser(): AuthUser | null {
  if (typeof window === "undefined") return null;

  try {
    const storedUser = window.localStorage.getItem(AUTH_USER_KEY);
    if (!storedUser) return null;

    const parsedUser: unknown = JSON.parse(storedUser);
    return isAuthUser(parsedUser) ? parsedUser : null;
  } catch {
    return null;
  }
}

export function storeUser(user: AuthUser): void {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
  window.dispatchEvent(new Event("kootahak-auth-changed"));
}

export function clearStoredUser(): void {
  if (typeof window === "undefined") return;

  window.localStorage.removeItem(AUTH_USER_KEY);
  window.dispatchEvent(new Event("kootahak-auth-changed"));
}
