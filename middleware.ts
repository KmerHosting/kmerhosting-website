import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "./lib/auth";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-secret-key-change-in-production"
);

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;
  const adminToken = request.cookies.get("admin_token")?.value;
  const pathname = request.nextUrl.pathname;

  console.log("Middleware: pathname =", pathname, "token exists =", !!token);

  // Admin routes protection
  const adminRoutes = ["/admin/dashboard", "/admin/services", "/admin/domains", "/admin/invoices"];
  const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route));

  if (isAdminRoute && !adminToken) {
    console.log("Middleware: Admin route without token, redirecting to admin login");
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  if (isAdminRoute && adminToken) {
    try {
      await jwtVerify(adminToken, JWT_SECRET);
    } catch (error) {
      console.log("Middleware: Admin token verification failed");
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  // User routes protection
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
