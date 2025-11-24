import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "./lib/auth";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;
  const pathname = request.nextUrl.pathname;

  console.log("Middleware: pathname =", pathname, "token exists =", !!token);

  // Routes that require authentication
  const protectedRoutes = ["/dashboard", "/services", "/invoices", "/domains"];

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // If trying to access a protected route without authentication
  if (isProtectedRoute && !token) {
    console.log("Middleware: Protected route without token, redirecting to login");
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // If trying to access a protected route with invalid token
  if (isProtectedRoute && token) {
    console.log("Middleware: Verifying token for protected route");
    const payload = await verifyJWT(token);
    if (!payload) {
      console.log("Middleware: Token verification failed, redirecting to login");
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
    console.log("Middleware: Token verified, allowing access");
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};
