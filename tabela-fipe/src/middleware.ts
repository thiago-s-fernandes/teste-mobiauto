import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Middleware para cache e redirecionamento
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/tabela-fipe/busca", request.url));
  }

  if (request.nextUrl.pathname.startsWith("/api/")) {
    const response = NextResponse.next();

    response.headers.set(
      "Cache-Control",
      "public, max-age=300, stale-while-revalidate=59"
    );
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)"
  ]
};
