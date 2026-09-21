import { MiddlewareConfig, NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";

const TOKEN_NAME = "token";
const authRoutes = ["/login", "/register"] as const;
const protectedRoutes = ["/dashboard"] as const;

const matches = (pathname: string, route: string): boolean =>
  pathname === route || pathname.startsWith(route + "/");

async function isTokenValid(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    await jwtVerify(token, secret);
    return true;
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(TOKEN_NAME)?.value;

  const isAuthRoute = authRoutes.some((route) => matches(pathname, route));
  const isProtectedRoute = protectedRoutes.some((route) =>
    matches(pathname, route),
  );

  if (!isAuthRoute && !isProtectedRoute) {
    return NextResponse.next();
  }

  const valid = await isTokenValid(token);

  if (valid && isAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!valid && isProtectedRoute) {
    const res = NextResponse.redirect(new URL("/login", request.url));
    if (token) res.cookies.delete(TOKEN_NAME);
    return res;
  }

  return NextResponse.next();
}

export const config: MiddlewareConfig = {
  matcher: ["/login", "/register", "/dashboard/:path*"],
};
