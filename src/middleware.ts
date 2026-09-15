import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SPANISH_ENABLED } from "@/lib/site-config";

// While the Spanish version is disabled (see src/lib/site-config.ts),
// every /es route redirects to its English equivalent instead of
// rendering. This is a temporary redirect (307), not permanent, since
// the whole point is that it can be switched back on later.
export function middleware(request: NextRequest) {
  if (SPANISH_ENABLED) return NextResponse.next();

  const { pathname } = request.nextUrl;
  const url = request.nextUrl.clone();
  url.pathname = pathname.replace(/^\/es/, "") || "/";
  return NextResponse.redirect(url, 307);
}

export const config = {
  matcher: ["/es", "/es/:path*"],
};
