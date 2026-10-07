import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";

/** Schützt alle /admin-Seiten. Login-Seite bleibt offen. */
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname === "/admin/login") return NextResponse.next();
  const token = req.cookies.get("admin_session")?.value;
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (token && secret) {
    try {
      await jwtVerify(token, new TextEncoder().encode(secret));
      return NextResponse.next();
    } catch {}
  }
  return NextResponse.redirect(new URL("/admin/login", req.url));
}

export const config = { matcher: ["/admin/:path*"] };
