import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // فقط مسیرهای login-admin
  if (pathname.startsWith("/login-admin")) {
    const isAdmin = request.cookies.get("isAdmin")?.value;

    // اگر لاگین نشده بود و می‌خواست بره به داشبورد → برگردون به لاگین
    if (pathname.startsWith("/login-admin/dashbord") && !isAdmin) {
      return NextResponse.redirect(new URL("/login-admin", request.url));
    }

    // اگر روی لاگین بود و کوکی داشت → بفرست داشبورد
    if (pathname === "/login-admin" && isAdmin) {
      return NextResponse.redirect(
        new URL("/login-admin/dashbord", request.url)
      );
    }
  }

  return NextResponse.next();
}

// مشخص کنیم روی چه مسیرهایی اجرا بشه
export const config = {
  matcher: ["/login-admin/:path*"],
};
