import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const checkMongoIDRegExp = new RegExp("^[0-9a-fA-F]{24}$");

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/api/entries/")) {
    const id = request.nextUrl.pathname.replace("/api/entries/", "");
    if (!checkMongoIDRegExp.test(id)) {
      const url = request.nextUrl.clone();
      url.pathname = "/api/bad-request";
      url.search = `?message=${id} is not a valid MongoId`;
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/entries/:path*"],
};
